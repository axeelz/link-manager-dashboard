import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { BarChart, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ILink } from "@/types";
import { getRelativeTimeString } from "@/lib/utils";
import { deleteLink } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkHeader } from "./link-header";

export default function LinksList({ links, editLink }: { links: ILink[]; editLink: (link: ILink) => void }) {
  return (
    <div className="flex flex-col [&>div]:border-b [&>div:last-child]:border-0">
      {links.length === 0 && (
        <div className="flex items-center justify-center h-44">
          <p className="text-muted-foreground">No links found</p>
        </div>
      )}
      {links.map((link: ILink) => {
        return (
          <AlertDialog key={link.id}>
            <div className="flex flex-col gap-4 py-6 sm:px-4 sm:hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <LinkHeader link={link} />
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => editLink(link)}>Edit</DropdownMenuItem>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex gap-2 sm:pl-12 flex-wrap">
                <Badge variant="secondary" title={new Date(link.createdAt).toLocaleString()} suppressHydrationWarning>
                  <Clock className="h-4 w-4 mr-1" />
                  {getRelativeTimeString(new Date(link.createdAt))}
                </Badge>
                <Badge variant="secondary">
                  <BarChart className="h-4 w-4 mr-1" />
                  {link.redirects} redirects
                </Badge>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/analytics?code=${link.code}`}>View redirects</Link>
                </Button>
              </div>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the link redirection.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteLink(link.code);
                  }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      })}
    </div>
  );
}
