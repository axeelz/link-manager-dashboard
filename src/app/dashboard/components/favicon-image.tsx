"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function FaviconImage({ domain }: { domain: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
        <Globe className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={`https://icon.horse/icon/${domain}`}
      alt=""
      height={32}
      width={32}
      className="h-8 w-8 shrink-0 rounded"
      onError={() => setFailed(true)}
    />
  );
}
