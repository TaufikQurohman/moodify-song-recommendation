import { NextResponse } from "next/server";
import { mockRecommendations } from "@/constants/content";
import type { RecommendRequest } from "@/types/recommendation";

const BACKEND_URL = process.env.RECOMMENDATION_BACKEND_URL;

export async function POST(request: Request) {
  const body = (await request.json()) as RecommendRequest;

  if (!body.text?.trim()) {
    return NextResponse.json({ message: "Text is required." }, { status: 400 });
  }

  if (!BACKEND_URL) {
    return NextResponse.json({ recommendations: mockRecommendations });
  }

  const upstream = await fetch(BACKEND_URL, {
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
}
