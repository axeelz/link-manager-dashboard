import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const password = data.get("password");

  if (password !== process.env.AUTH_PASSWORD) {
    redirect("/sign-in?error=invalid");
  }

  await createSession();
  redirect("/dashboard");
}
