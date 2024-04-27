"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => location.reload()}>
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Retry</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Oops...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-44">
            <div className="flex flex-col items-center gap-3">
              <p className="text-muted-foreground">An error occurred while fetching the data</p>
              <code className="text-sm text-muted-foreground p-2 rounded-lg bg-muted">{error.message}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
