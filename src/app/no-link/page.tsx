"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { LINK_MANAGER_URL } from "@/lib/constants";

function ErrorText({ code }: { code: string }) {
  if (code) {
    const linkManagerUrl = new URL(LINK_MANAGER_URL).hostname;
    const displayCode = code.length > 10 ? `${code.slice(0, 10)}...` : code;
    return (
      <p>
        {linkManagerUrl}/<span className="font-semibold">{displayCode}</span> does not seem to
        exist.
      </p>
    );
  }

  return <p>This link does not seem to exist.</p>;
}

export default function NoLinkPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  return (
    <div className="h-screen w-full bg-white dark:bg-black">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl font-bold text-black md:text-4xl dark:text-white">
            We could not find that redirection
          </h2>
          <div className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 md:text-lg dark:text-neutral-200">
            <ErrorText code={code} />
            <span className="mt-2 inline-flex items-center gap-1 text-sm md:text-base">
              <a href="https://axeelz.com" className="underline underline-offset-8">
                Go to the homepage
              </a>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
