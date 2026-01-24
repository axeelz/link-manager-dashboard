import type { RedirectAndLink, UserAgent, Location, Link } from "@/types";

import AnalyticsPage from "@/app/dashboard/analytics/components/analytics-page";
import { USER_AGENT } from "@/lib/constants";

interface RedirectRaw {
  id: number;
  linkId: number;
  location: string;
  language: string;
  referrer: string;
  userAgent: string;
  createdAt: string;
}

interface RedirectAndLinkRaw {
  redirects: RedirectRaw;
  links: Link | null;
}

async function getRedirects(): Promise<RedirectAndLink[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/redirects`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "User-Agent": USER_AGENT,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch redirects");
  }
  const data: RedirectAndLinkRaw[] = await res.json();
  return data.map((redirect) => ({
    redirects: {
      ...redirect.redirects,
      userAgent: JSON.parse(redirect.redirects.userAgent) as UserAgent,
      location: JSON.parse(redirect.redirects.location) as Location,
    },
    links: redirect.links,
  }));
}

export default async function Analytics() {
  const redirects = await getRedirects();

  return <AnalyticsPage redirects={redirects} />;
}
