import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;
const MAX_RATE_LIMIT_KEYS = 1_000;

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const now = Date.now();
  sweepExpired(now);
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  return NextResponse.next();
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function sweepExpired(now: number) {
  for (const [key, entry] of RATE_LIMIT) {
    if (now > entry.resetAt) RATE_LIMIT.delete(key);
  }

  if (RATE_LIMIT.size <= MAX_RATE_LIMIT_KEYS) return;

  const overflow = RATE_LIMIT.size - MAX_RATE_LIMIT_KEYS;
  for (const key of Array.from(RATE_LIMIT.keys()).slice(0, overflow)) {
    RATE_LIMIT.delete(key);
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
