import { NextResponse } from "next/server";
import { mockRecommendations } from "@/constants/content";
import type { RecommendRequest } from "@/types/recommendation";

const PRODUCTION_BACKEND_URL = "https://zesty-wholeness-production-80d3.up.railway.app/api/recommend";

function normalizeBackendUrl(url: string) {
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;
  const parsed = new URL(withProtocol);

  if (parsed.pathname === "/") {
    parsed.pathname = "/api/recommend";
  }

  return parsed.toString();
}

function getBackendUrl() {
  const configuredUrl = process.env.RECOMMENDATION_BACKEND_URL;

  if (!configuredUrl) {
    return process.env.NODE_ENV === "production" ? PRODUCTION_BACKEND_URL : undefined;
  }

  if (process.env.NODE_ENV === "production" && configuredUrl.includes("localhost")) {
    return PRODUCTION_BACKEND_URL;
  }

  return normalizeBackendUrl(configuredUrl);
}

export async function POST(request: Request) {
  const body = (await request.json()) as RecommendRequest;

  if (!body.text?.trim()) {
    return NextResponse.json({ message: "Text is required." }, { status: 400 });
  }

  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    return NextResponse.json({ recommendations: mockRecommendations });
  }

  try {
    const upstream = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: body.text }),
      cache: "no-store"
    });

    if (!upstream.ok) {
      return NextResponse.json({ message: "Recommendation backend failed." }, { status: upstream.status });
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Recommendation backend request failed:", error);
    return NextResponse.json({ message: "Recommendation backend is unreachable." }, { status: 502 });
  }
}
