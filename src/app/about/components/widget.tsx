import { Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Widget = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className="">
      <div className=" relative w-full max-w-xs">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start  justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
          <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
            <Code className="h-3 w-3 text-gray-300" />
          </div>

          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">{title}</h1>

          <p className="relative z-50 mb-4 text-base font-normal text-slate-500">{description}</p>

          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-4 py-1 text-gray-300"
          >
            <span>Explore</span>
            <ExternalLink className="h-4 w-4 text-gray-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};
