import { LINK_MANAGER_URL } from "@/lib/constants";
import type { ILink } from "@/types";
import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LinkHeader({ link }: { link: ILink }) {
  const linkManagerUrl = new URL(LINK_MANAGER_URL);

  let urlDomain: string;
  let readableUrl: string;
  try {
    const parsedUrl = new URL(link.url);
    urlDomain = parsedUrl.hostname;
    readableUrl = `${parsedUrl.hostname}${parsedUrl.pathname}`;
  } catch (e) {
    urlDomain = link.url;
    readableUrl = link.url;
  }

  return (
    <div className="flex gap-4">
      <Image
        src={`https://icon.horse/icon/${urlDomain}`}
        alt="Website Icon"
        height={32}
        width={32}
        className="h-8 w-8 rounded"
      />
      <div className="flex flex-col gap-2 break-all">
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/${link.code}`} className="font-medium" target="_blank">
          {linkManagerUrl.hostname}
          <span className="font-bold">/{link.code}</span>
        </Link>
        <div className="text-muted-foreground inline-flex items-center gap-2">
          <Forward className="h-4 w-4 shrink-0" />
          <span className="text-xs sm:text-sm">{readableUrl}</span>
        </div>
      </div>
    </div>
  );
}
