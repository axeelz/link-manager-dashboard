"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) {
    return null;
  }

  return (
    <p className="text-red-500 text-sm font-medium">{error == "CredentialsSignin" ? "Invalid password" : error}</p>
  );
}
