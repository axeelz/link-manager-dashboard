"use client";

import { Loader, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" disabled>
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Loading...</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Redirections</CardTitle>
          <CardDescription>Here are all the times your links have been clicked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-44 items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
