import { NextResponse } from "next/server";

// --- Why this file exists ---
// GitHub's "total contributions" count (the green-squares total) and per-repo line
// stats both require a personal access token. Tokens must NEVER be sent to the browser,
// so this server-side route acts as a secure proxy: the browser fetches /api/github-stats,
// we fetch GitHub on its behalf, and only plain numbers come back to the client.

const GITHUB_USERNAME = "Abyss999";

// GitHub only allows contributionsCollection queries spanning up to 1 year at a time,
// so we request each calendar year individually using GraphQL field aliases, then sum.
function buildQuery(startYear: number, endYear: number): string {
  const yearFragments = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return `
      y${year}: contributionsCollection(
        from: "${year}-01-01T00:00:00Z"
        to:   "${year}-12-31T23:59:59Z"
      ) {
        contributionCalendar { totalContributions }
      }`;
  }).join("\n");

  return `query {
    user(login: "${GITHUB_USERNAME}") {
      createdAt
      ${yearFragments}
    }
  }`;
}

// Fetch line additions/deletions across the user's top repos.
// Uses the REST contributor-stats endpoint which returns a weekly breakdown per contributor.
// Note: GitHub returns 202 while it's still computing stats — we skip those repos.
// Note: only covers repos the user owns, not contributions to other people's repos.
async function fetchDiffStats(token: string): Promise<{ additions: number; deletions: number }> {
  const reposRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=pushed&type=owner`,
    { headers: { Authorization: `bearer ${token}` } }
  );
  const repos: { name: string; fork: boolean }[] = await reposRes.json();

  // Top 10 non-fork repos sorted by most recently pushed
  const topRepos = repos.filter((r) => !r.fork).slice(0, 10);

  // Fetch contributor stats for each repo in parallel.
  // Each response is an array of { author: { login }, weeks: [{ a, d, c }] }.
  const statsResults = await Promise.allSettled(
    topRepos.map((repo) =>
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`,
        { headers: { Authorization: `bearer ${token}` } }
      ).then((r) => (r.status === 200 ? r.json() : null))
    )
  );

  let additions = 0;
  let deletions = 0;

  for (const result of statsResults) {
    if (result.status !== "fulfilled" || !Array.isArray(result.value)) continue;

    // Find this user's entry in the contributors array
    const entry = result.value.find(
      (s: { author: { login: string } }) =>
        s.author?.login?.toLowerCase() === GITHUB_USERNAME.toLowerCase()
    );
    if (!entry) continue;

    // Sum all weekly additions and deletions
    for (const week of entry.weeks as { a: number; d: number }[]) {
      additions += week.a;
      deletions += week.d;
    }
  }

  return { additions, deletions };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  // If no token is set yet, return nulls so the client degrades gracefully.
  if (!token) {
    return NextResponse.json({ contributions: null, additions: null, deletions: null });
  }

  try {
    const accountCreatedYear = 2019; // Abyss999 joined Sep 2019
    const currentYear = new Date().getFullYear();

    // Run GraphQL (contributions) and REST (diff stats) in parallel
    const [graphqlRes, diffStats] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: buildQuery(accountCreatedYear, currentYear) }),
        // Cache for 24 hours — GitHub isn't hit on every page load
        next: { revalidate: 86400 },
      }),
      fetchDiffStats(token),
    ]);

    const json = await graphqlRes.json();

    if (json.errors || !json.data?.user) {
      console.error("GitHub GraphQL error:", json.errors);
      return NextResponse.json({ contributions: null, ...diffStats });
    }

    // Sum totalContributions across all aliased years
    const user = json.data.user;
    let contributions = 0;
    for (let year = accountCreatedYear; year <= currentYear; year++) {
      contributions += user[`y${year}`]?.contributionCalendar?.totalContributions ?? 0;
    }

    return NextResponse.json({ contributions, ...diffStats });
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    return NextResponse.json({ contributions: null, additions: null, deletions: null });
  }
}
