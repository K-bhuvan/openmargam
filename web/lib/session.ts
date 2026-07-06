import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, sessionCookieName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = cookies().get(sessionCookieName)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, role: true, name: true },
  });
  return user;
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
}
