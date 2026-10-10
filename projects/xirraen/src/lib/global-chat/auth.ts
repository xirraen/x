import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "global_chat_admin";

function sessionKey() {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET harus tersedia dan minimal 32 karakter.");
  return new TextEncoder().encode(secret);
}

export function adminPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD_HASH?.trim().toLowerCase() ?? "";
  if (!/^[a-f0-9]{64}$/.test(expected)) return false;
  const actual = createHash("sha256").update(password).digest();
  return timingSafeEqual(Buffer.from(expected, "hex"), actual);
}

export async function createAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(sessionKey());
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !process.env.SESSION_SECRET?.trim()) return false;
  try {
    return (await jwtVerify(token, sessionKey())).payload.role === "admin";
  } catch {
    return false;
  }
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  },
};
