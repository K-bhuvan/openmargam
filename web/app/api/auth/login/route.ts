import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, sessionCookieName, sessionTtl } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  passcode: z.string().min(1, "Enter your passcode."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Validation failed." }, { status: 400 });
  }

  const { email, passcode } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    return NextResponse.json({ error: "No account found for this email. Create an account instead." }, { status: 404 });
  }

  const valid = await bcrypt.compare(passcode, user.passcodeHash);
  if (!valid) {
    return NextResponse.json({ error: "Passcode does not match." }, { status: 401 });
  }

  const token = await signSession({ userId: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionTtl,
  });
  return response;
}
