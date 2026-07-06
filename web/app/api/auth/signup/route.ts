import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, sessionCookieName, sessionTtl } from "@/lib/auth";

const SignupSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  passcode: z.string().min(6, "Passcode must be at least 6 characters."),
  role: z.enum(["MENTEE", "MENTOR"]),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json({ error: firstError?.message ?? "Validation failed." }, { status: 400 });
  }

  const { name, email, passcode, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email exists. Sign in instead." }, { status: 409 });
  }

  const passcodeHash = await bcrypt.hash(passcode, 12);
  const user = await prisma.user.create({
    data: { name, email: normalizedEmail, passcodeHash, role },
    select: { id: true, name: true, email: true, role: true },
  });

  const token = await signSession({ userId: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ user });
  response.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionTtl,
  });
  return response;
}
