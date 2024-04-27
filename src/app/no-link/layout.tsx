import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "You're lost",
  description: "This link does not seem to exist.",
};

export default function NoLinkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
