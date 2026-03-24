"use client";

import { Loader, PlusCircle, RefreshCcw } from "lucide-react";
import { useState } from "react";

import type { Link as LinkType, NewLinkPayload, Stats } from "@/types";

import { createLink, editLink } from "@/app/actions";
import LinksList from "@/app/dashboard/components/links-list";
import StatsComponent from "@/app/dashboard/components/stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LINK_MANAGER_URL } from "@/lib/constants";

export default function DashboardPage({ links, stats }: { links: LinkType[]; stats: Stats }) {
  const [newLink, setNewLink] = useState<NewLinkPayload>({
    url: "",
    code: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkType | null>(null);

  const { toast } = useToast();

  const enableEditing = (link: LinkType) => {
    setEditingLink(link);
    setNewLink({ url: link.url, code: link.code });
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    setEditingLink(null);
    setNewLink({ url: "", code: "" });
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <StatsComponent stats={stats} />

        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={() => location.reload()}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Refresh</span>
            </Button>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New redirection</span>
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
            <CardDescription>Here are all the redirections that are set up.</CardDescription>
          </CardHeader>
          <CardContent>
            <LinksList links={links} editLink={enableEditing} />
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              <strong>
                {links.length > 0 ? "1" : "0"}-{links.length}
              </strong>{" "}
              of <strong>{stats.totalLinks}</strong> links
            </div>
          </CardFooter>
        </Card>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingLink ? "Edit redirection" : "New redirection"}</DialogTitle>
            <DialogDescription>
              {editingLink ? "Edit an existing redirection." : "Add a new redirection."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">
                Redirect to <span className="text-red-500">(required)</span>
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://www.youtube.com"
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                value={newLink.url}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">
                {" "}
                {new URL(LINK_MANAGER_URL).hostname}&nbsp;/&nbsp;
                <span className="text-indigo-500">code</span>{" "}
              </Label>
              <Input
                id="code"
                type="text"
                minLength={1}
                placeholder="Enter code here (ex: ytb)"
                onChange={(e) => setNewLink({ ...newLink, code: e.target.value })}
                value={newLink.code}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to generate a random code.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={addingLink}
              type="submit"
              onClick={() => {
                setAddingLink(true);
                if (editingLink) {
                  // Update existing link
                  editLink(editingLink.code, newLink)
                    .then(({ code, error }) => {
                      if (error) {
                        toast({
                          variant: "destructive",
                          title: "Couldn't update redirection",
                          description: error,
                        });
                        return;
                      }
                      toast({
                        title: "Redirection updated",
                        description: `${LINK_MANAGER_URL}/${code}`,
                      });
                      setDialogOpen(false);
                    })
                    .catch((err) => {
                      toast({
                        variant: "destructive",
                        title: "Unexpected error",
                        description: err.message,
                      });
                    })
                    .finally(() => setAddingLink(false));
                  return;
                }
                // Create new link
                createLink(newLink)
                  .then(({ code, error }) => {
                    if (error) {
                      toast({
                        variant: "destructive",
                        title: "Couldn't add new redirection",
                        description: error,
                      });
                      return;
                    }
                    toast({
                      title: "Redirection added",
                      description: `${LINK_MANAGER_URL}/${code}`,
                    });
                    setDialogOpen(false);
                  })
                  .catch((err) => {
                    toast({
                      variant: "destructive",
                      title: "Unexpected error",
                      description: err.message,
                    });
                  })
                  .finally(() => setAddingLink(false));
              }}
            >
              {addingLink && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
