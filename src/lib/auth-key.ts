import { jwtVerify } from "jose";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is not set");
}

export const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function verifySessionToken(token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, key);
    return true;
  } catch {
    return false;
  }
}
