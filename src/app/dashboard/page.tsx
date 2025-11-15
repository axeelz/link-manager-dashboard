import type { ILink, IStats } from "@/types";
import DashboardPage from "@/app/dashboard/components/dashboard-page";

async function getLinks(): Promise<ILink[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Missing required environment variables");
  }

  const res = await fetch(`${apiUrl}/links`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch links: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function getStats(): Promise<IStats> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Missing required environment variables");
  }

  const res = await fetch(`${apiUrl}/links/stats`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function Dashboard() {
  const linksData = await getLinks();
  const statsData = await getStats();
  const [links, stats] = await Promise.all([linksData, statsData]);

  return <DashboardPage links={links} stats={stats} />;
}
