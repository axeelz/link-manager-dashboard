import type { ILink, IStats } from "@/types";
import DashboardPage from "@/app/dashboard/components/dashboard-page";

async function getLinks(): Promise<ILink[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/links", {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch links");
  }
  return res.json();
}

async function getStats(): Promise<IStats> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/links/stats", {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }
  return res.json();
}

export default async function Dashboard() {
  const linksData = await getLinks();
  const statsData = await getStats();
  const [links, stats] = await Promise.all([linksData, statsData]);

  return <DashboardPage links={links} stats={stats} />;
}
