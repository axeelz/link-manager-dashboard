"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) {
    return null;
  }

  return (
    <p className="text-sm font-medium text-red-500">
      {error === "invalid" ? "Invalid password" : error}
    </p>
  );
}
