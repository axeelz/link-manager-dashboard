import { Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Widget = ({ title, description, link }: { title: string; description: string; link: string }) => {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <Code className="h-3 w-3 text-gray-300" />
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">{title}</h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">{description}</p>

          <Link
            href={link}
            target="_blank"
            className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 inline-flex items-center gap-2">
            <span>Explore</span>
            <ExternalLink className="w-4 h-4 text-gray-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};
