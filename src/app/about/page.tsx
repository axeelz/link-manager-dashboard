"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "@/app/about/components/wobble-card";
import { ContainerScroll } from "@/app/about/components/container-scroll-animation";
import { LINK_MANAGER_URL } from "@/lib/constants";
import { Tabs } from "@/app/about/components/tabs";
import { CarouselScreenshots } from "@/app/about/components/carousel";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/app/about/components/glowing-stars";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Widget } from "@/app/about/components/widget";
import InteractiveDemo from "./interactive-demo";

const tabs = [
  {
    title: "Links Overview",
    value: "links",
  },
  {
    title: "New redirection",
    value: "new",
  },
  {
    title: "Links Analytics",
    value: "redirects",
  },
];

const technologies = [
  {
    title: "ElysiaJS",
    link: "https://elysiajs.com/",
    description:
      "TypeScript framework to build backend apps with Bun. Its speed and simplicity made it the perfect choice.",
  },
  {
    title: "Drizzle",
    link: "https://orm.drizzle.team/",
    description: "Fast TypeScript ORM that I used to query the database with amazing developer experience.",
  },
  {
    title: "Turso",
    link: "https://turso.tech/",
    description: "Simple and efficient SQLite database that integrates well with Drizzle.",
  },
  {
    title: "Docker",
    link: "https://docker.com/",
    description: "I used Docker to containerize the ElysiaJS API and deploy it to any server.",
  },
  {
    title: "Next.js",
    link: "https://nextjs.org/",
    description: "React framework that I used to build all the UI including the dashboard and this page.",
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    description:
      "CSS framework for the frontend. Made it quick to design with UI libs such as shadcn/ui and Aceternity",
  },
];

const sources = [
  {
    title: "Back-end",
    link: "https://github.com/axeelz/link-manager-api",
    description: "The API for the link manager. The part that handles the redirections, links, and analytics.",
  },
  {
    title: "Front-end",
    link: "https://github.com/axeelz/link-manager-dashboard",
    description: "The visual interface for the link manager. It allows me to manage links, see analytics, and more.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="w-full p-4 absolute top-0 left-0 flex justify-start z-10">
        <Link
          href="https://axeelz.com/"
          className="px-8 py-2 rounded-full bg-gray-200 text-black focus:ring-2 focus:ring-blue-400 inline-flex gap-1">
          <ArrowLeft className="w-6 h-6" />
          My portfolio
        </Link>
      </div>

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-3xl md:text-4xl font-semibold text-black dark:text-white">
                <span className="text-muted-foreground">{new URL(LINK_MANAGER_URL).hostname}</span>, my personal <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">Link&nbsp;Manager</span>
              </h1>
            </>
          }>
          <Image
            src={`/links.webp`}
            priority={true}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <main className="max-w-7xl mx-auto p-4 sm:px-6 sm:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-900 min-h-[300px] lg:min-h-[300px]"
            className="">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Create and manage short links easily.
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                With a simple and easy-to-use interface, the link manager allows me to share short links that redirect
                to any URL, or even serve static files.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-pink-800">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No more broken links.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              The link manager makes it easy to keep track of links I shared and edit where they redirect to at any
              time.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[300px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Keep track of their performance.
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                It also provides insights into how many times a link was clicked, where the clicks came from, and basic
                info about the visitors.
              </p>
            </div>
          </WobbleCard>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Screenshots</h2>

          <div className="md:hidden flex items-center justify-center my-8 py-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-500">
            <CarouselScreenshots />
          </div>

          <div className="hidden h-[20rem] md:h-[40rem] [perspective:1000px] relative b md:flex flex-col w-full items-start justify-start mt-8 mb-40">
            <Tabs tabs={tabs} />
          </div>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Example</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Here is an example of a redirection handled by the link manager. See where it redirects you to!
          </p>

          <div className="py-8">
            <InteractiveDemo />
          </div>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Technologies</h2>
          <p className="mt-4 text-muted-foreground">
            The link manager is a full-stack application built with several technologies that I love or wanted to try.
          </p>

          <div className="pt-8 antialiased grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((technology) => (
              <GlowingStarsBackgroundCard key={technology.title}>
                <GlowingStarsTitle>{technology.title}</GlowingStarsTitle>
                <div className="flex justify-between items-end mt-2">
                  <GlowingStarsDescription>{technology.description}</GlowingStarsDescription>
                  <Link href={technology.link} target="_blank">
                    <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                      <ExternalLink className="text-white w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </GlowingStarsBackgroundCard>
            ))}
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Source code</h2>
          <p className="mt-4 text-muted-foreground">
            The link manager is open-source and available on GitHub. Feel free to check it out, open issues, and
            discuss.
          </p>

          <div className="py-8 flex align-center gap-6 flex-wrap">
            {sources.map((source) => (
              <Widget key={source.title} title={source.title} description={source.description} link={source.link} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
