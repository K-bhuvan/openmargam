import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Prisma } from "@prisma/client";
import { verifySession, sessionCookieName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name: string;
  onboarded: boolean;
  preferences: Record<string, string>;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(sessionCookieName)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, role: true, name: true, onboarded: true, preferences: true },
  });
  if (!user) return null;
  return {
    ...user,
    role: user.role as string,
    preferences: normalizePreferences(user.preferences),
  };
}

export function normalizePreferences(raw: Prisma.JsonValue): Record<string, string> {
  const parsed = typeof raw === "string" ? parseJson(raw) : raw;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  return Object.fromEntries(
    Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
}
