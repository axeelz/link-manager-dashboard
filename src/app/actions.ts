"use server";

import { revalidatePath } from "next/cache";

import type { NewLinkPayload } from "@/types";

import { USER_AGENT } from "@/lib/constants";
import { requireSession } from "@/lib/session";

interface CreateUpdateLinkResponse {
  code: string | null;
  error: string | null;
}

const authHeaders = {
  Authorization: `Bearer ${process.env.API_KEY}`,
  "User-Agent": USER_AGENT,
};

async function mutateLink(
  url: string,
  method: "POST" | "PUT",
  payload: NewLinkPayload,
): Promise<CreateUpdateLinkResponse> {
  const res = await fetch(url, {
    method,
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return { code: null, error: message };
  }

  const data = await res.json();
  revalidatePath("/");
  return { code: data[0].code, error: null };
}

export async function createLink(payload: NewLinkPayload): Promise<CreateUpdateLinkResponse> {
  await requireSession();
  return mutateLink(`${process.env.NEXT_PUBLIC_API_URL}/links`, "POST", payload);
}

export async function editLink(
  code: string,
  payload: NewLinkPayload,
): Promise<CreateUpdateLinkResponse> {
  await requireSession();
  return mutateLink(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, "PUT", payload);
}

export async function deleteLink(code: string) {
  await requireSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, {
    method: "DELETE",
    headers: authHeaders,
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  revalidatePath("/");
}
