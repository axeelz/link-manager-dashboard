"use client";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { LINK_MANAGER_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

function ErrorText({ code }: { code: string }) {
  if (code) {
    const linkManagerUrl = new URL(LINK_MANAGER_URL).hostname;
    const displayCode = code.length > 10 ? `${code.slice(0, 10)}...` : code;
    return (
      <p>
        {linkManagerUrl}/<span className="font-semibold">{displayCode}</span> does not seem to exist.
      </p>
    );
  }

  return <p>This link does not seem to exist.</p>;
}

export default function NoLinkPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const linkManagerUrl = new URL(LINK_MANAGER_URL).hostname;

  let errorText = "This link does not seem to exist.";
  if (code) {
    const displayCode = code.length > 10 ? `${code.slice(0, 10)}...` : code;
    errorText = `${linkManagerUrl}/${displayCode} does not seem to exist.`;
  }

  return (
    <div className="h-screen dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto w-full h-full flex justify-center items-center">
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
          className="div">
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            We could not find that redirection
          </h2>
          <div className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            <ErrorText code={code} />
            <span className="inline-flex items-center gap-1 mt-2 text-sm md:text-base">
              <a href="https://axeelz.com" className="underline underline-offset-8">
                Go to the homepage
              </a>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
