"use server";

import { revalidatePath } from "next/cache";

import type { NewLinkPayload } from "@/types";

import { USER_AGENT } from "@/lib/constants";
import { requireSession } from "@/lib/session";

interface CreateUpdateLinkResponse {
  code: string | null;
  error: string | null;
}

export async function createLink(payload: NewLinkPayload): Promise<CreateUpdateLinkResponse> {
  await requireSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.message;
    return { code: null, error: errorMessage };
  }

  revalidatePath("/");

  return { code: data[0].code, error: null };
}

export async function editLink(
  code: string,
  payload: NewLinkPayload,
): Promise<CreateUpdateLinkResponse> {
  await requireSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.message;
    return { code: null, error: errorMessage };
  }

  revalidatePath("/");

  return { code: data[0].code, error: null };
}

export async function deleteLink(code: string) {
  await requireSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "User-Agent": USER_AGENT,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  revalidatePath("/");

  return;
}
