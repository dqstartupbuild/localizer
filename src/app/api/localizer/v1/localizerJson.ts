import { NextResponse } from "next/server";

const noStoreHeaders = { "Cache-Control": "no-store" };

export function localizerJson(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...noStoreHeaders, ...init?.headers },
  });
}
