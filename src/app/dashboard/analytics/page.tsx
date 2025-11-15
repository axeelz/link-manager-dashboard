import type { IRedirectAndLink } from "@/types";
import AnalyticsPage from "@/app/dashboard/analytics/components/analytics-page";
import { USER_AGENT } from "@/lib/constants";

async function getRedirects(): Promise<IRedirectAndLink[]> {
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
  const data = await res.json();
  return data.map((redirect: any) => {
    redirect.redirects.userAgent = JSON.parse(redirect.redirects.userAgent);
    redirect.redirects.location = JSON.parse(redirect.redirects.location);
    return redirect;
  });
}

export default async function Analytics() {
  const redirects = await getRedirects();

  return <AnalyticsPage redirects={redirects} />;
}
