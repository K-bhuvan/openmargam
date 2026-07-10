import { SignJWT, jwtVerify } from "jose";

const DEV_JWT_SECRET = "dev-secret-change-in-production-32chars";
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "openmargam_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export const sessionCookieName = COOKIE_NAME;
export const sessionTtl = SESSION_TTL;

function getSecret(): Uint8Array {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production.");
  }

  if (jwtSecret && jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters.");
  }

  return new TextEncoder().encode(jwtSecret || DEV_JWT_SECRET);
}
