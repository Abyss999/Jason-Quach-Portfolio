import { NextResponse } from "next/server";

// --- Why this file exists ---
// GitHub's "total contributions" count (the green-squares total) requires a personal access
// token. Tokens must NEVER be sent to the browser, so this server-side route acts as a
// secure proxy: the browser fetches /api/github-stats, we fetch GitHub on its behalf,
// and only plain numbers come back to the client.

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

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  // If no token is set yet, return null so the client degrades gracefully.
  if (!token) {
    return NextResponse.json({ contributions: null });
  }

  try {
    const accountCreatedYear = 2019; // Abyss999 joined Sep 2019
    const currentYear = new Date().getFullYear();

    const graphqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: buildQuery(accountCreatedYear, currentYear) }),
      // Cache for 24 hours — GitHub isn't hit on every page load
      next: { revalidate: 86400 },
    });

    const json = await graphqlRes.json();

    if (json.errors || !json.data?.user) {
      console.error("GitHub GraphQL error:", json.errors);
      return NextResponse.json({ contributions: null });
    }

    // Sum totalContributions across all aliased years
    const user = json.data.user;
    let contributions = 0;
    for (let year = accountCreatedYear; year <= currentYear; year++) {
      contributions += user[`y${year}`]?.contributionCalendar?.totalContributions ?? 0;
    }

    return NextResponse.json({ contributions });
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    return NextResponse.json({ contributions: null });
  }
}
