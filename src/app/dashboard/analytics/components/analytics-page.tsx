"use client";

import RedirectsList from "@/app/dashboard/analytics/components/redirects-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IRedirectAndLink } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ListFilter, RefreshCcw, X } from "lucide-react";

export default function AnalyticsPage({ redirects }: { redirects: IRedirectAndLink[] }) {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const onlyShow = code && code.length > 0 ? code : null;
  const router = useRouter();

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => location.reload()}>
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Refresh</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Redirections</CardTitle>
          <CardDescription>Here are all the times your links have been clicked</CardDescription>
        </CardHeader>
        <CardContent>
          {onlyShow && (
            <div className="flex items-center gap-2 mb-4">
              <ListFilter className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Only showing redirects for <strong>/{onlyShow}</strong>
              </p>
              <Button size="sm" variant="ghost" onClick={() => router.push("/dashboard/analytics")}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          )}
          <RedirectsList redirects={redirects} onlyShow={onlyShow} />
        </CardContent>
      </Card>
    </>
  );
}
