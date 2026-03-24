import "server-only";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { key, verifySessionToken } from "@/lib/auth-key";

const EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;

export async function createSession() {
  const expiresAt = new Date(Date.now() + EXPIRES_MS);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(key);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function requireSession() {
  const token = (await cookies()).get("session")?.value;
  if (!(await verifySessionToken(token))) throw new Error("Unauthorized");
}
