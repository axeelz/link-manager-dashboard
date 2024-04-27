"use client";

import { LinkHeader } from "@/app/dashboard/components/link-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ILink } from "@/types";
import { BarChart, ExternalLink, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InteractiveDemo() {
  const [demoLink, setDemoLink] = useState<ILink | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDemoLink = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/demo/info`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch demo link");
        }
        return res.json();
      })
      .then((data) => {
        setDemoLink(data);
      })
      .catch((e) => {
        setError(e.message);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchDemoLink();
  }, []);

  if (error) {
    return <p className="text-sm text-muted-foreground">Temporaily unavailable</p>;
  }

  if (!demoLink) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <LinkHeader link={demoLink} />
      <div className="flex gap-2 sm:pl-12 flex-wrap">
        <Badge variant="secondary" className="gap-1">
          <BarChart className="h-4 w-4" />
          {demoLink.redirects} redirects
        </Badge>
        <Button size="sm" variant="outline" onClick={() => fetchDemoLink()} className="gap-1">
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh count</span>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/${demoLink.code}`} className="gap-1" target="_blank">
            <ExternalLink className="h-4 w-4" />
            <span>Open link in new tab</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
