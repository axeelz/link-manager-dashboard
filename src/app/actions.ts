"use server";

import type { INewLinkPayload } from "@/types";
import { revalidatePath } from "next/cache";

interface ICreateUpdateLinkResponse {
  code: string | null;
  error: string | null;
}

export async function createLink(payload: INewLinkPayload): Promise<ICreateUpdateLinkResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
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

export async function editLink(code: string, payload: INewLinkPayload): Promise<ICreateUpdateLinkResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${code}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  revalidatePath("/");

  return;
}

export async function deleteAllLinks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete all links");
  }

  revalidatePath("/");

  return;
}
