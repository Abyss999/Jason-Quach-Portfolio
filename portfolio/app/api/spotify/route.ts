import { NextResponse} from "next/server";

// spotify tokens
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const tokenURL = "https://accounts.spotify.com/api/token";
// spotify requests
const meURL = "https://api.spotify.com/v1/me";

async function refreshAccessToken() {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"); // spotify requires base64

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", REFRESH_TOKEN || "");

    const res = await fetch(tokenURL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    const data = await res.json();
    if (!data.access_token) console.error("refreshAccessToken failed:", data);
    return data.access_token;
}

async function getNowPlaying(accessToken: string) {
    const res = await fetch(`${meURL}/player/currently-playing`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 204) return null;

    const data = await res.json();
    return data;
}

async function getTopTracks(accessToken: string, tracks: number = 5, timeRange: "short_term" | "medium_term" | "long_term") {
    const res = await fetch(`${meURL}/top/tracks?limit=${tracks}&time_range=${timeRange}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await res.json();
    if (!res.ok) console.error("getTopTracks error:", res.status, data);
    return data.items ?? [];
}

async function getTopArtists(accessToken: string, artists: number = 5, timeRange: "short_term" | "medium_term" | "long_term") {
    const res = await fetch(`${meURL}/top/artists?limit=${artists}&time_range=${timeRange}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await res.json();
    if (!res.ok) console.error("getTopArtists error:", res.status, data);
    return data.items ?? [];
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("timeRange") as "short_term" | "medium_term" | "long_term" || "medium_term";

    const accessToken = await refreshAccessToken();

    const [nowPlaying, topTracks, topArtists] = await Promise.all([
        getNowPlaying(accessToken),
        getTopTracks(accessToken, 5, timeRange),
        getTopArtists(accessToken, 5, timeRange),
    ]);

    return NextResponse.json({ nowPlaying, topTracks, topArtists });
}