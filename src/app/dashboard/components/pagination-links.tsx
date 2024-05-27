"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationLinks({
  page,
  limit,
  total,
  hasNext,
  hasPrev,
}: Readonly<{
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}>) {
  const totalPages = Math.ceil(total / limit);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href={`?page=1`} aria-disabled={!hasPrev}>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href={`?page=${page - 1}`} aria-disabled={!hasPrev} />
        </PaginationItem>

        <span className="font-medium text-sm px-2">
          Page {page} of {totalPages}
        </span>

        <PaginationItem>
          <PaginationNext href={`?page=${page + 1}`} aria-disabled={!hasNext} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=${totalPages}`} aria-disabled={!hasNext}>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
