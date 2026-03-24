import { Forward } from "lucide-react";
import Link from "next/link";

import type { Link as LinkType } from "@/types";

import { FaviconImage } from "@/app/dashboard/components/favicon-image";
import { LINK_MANAGER_URL } from "@/lib/constants";

export function LinkHeader({ link }: { link: LinkType }) {
  const linkManagerUrl = new URL(LINK_MANAGER_URL);

  let urlDomain: string;
  let readableUrl: string;
  try {
    const parsedUrl = new URL(link.url);
    urlDomain = parsedUrl.hostname;
    readableUrl = `${parsedUrl.hostname}${parsedUrl.pathname}`;
  } catch {
    urlDomain = link.url;
    readableUrl = link.url;
  }

  return (
    <div className="flex gap-4">
      <FaviconImage domain={urlDomain} />
      <div className="flex flex-col gap-2 break-all">
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/${link.code}`}
          className="font-medium"
          target="_blank"
        >
          {linkManagerUrl.hostname}
          <span className="font-bold">/{link.code}</span>
        </Link>
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <Forward className="h-4 w-4 shrink-0" />
          <span className="text-xs sm:text-sm">{readableUrl}</span>
        </div>
      </div>
    </div>
  );
}
