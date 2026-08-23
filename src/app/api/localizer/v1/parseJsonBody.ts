import type { NextRequest } from "next/server";

export async function parseJsonBody(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 2_000_000) throw new Error("The request body is too large.");
  const text = await request.text();
  if (text.length > 2_000_000)
    throw new Error("The request body is too large.");
  return JSON.parse(text) as unknown;
}
