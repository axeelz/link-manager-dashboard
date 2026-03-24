import { redirect } from "next/navigation";

import { deleteSession } from "@/lib/session";

export async function POST() {
  await deleteSession();
  redirect("/sign-in");
}
