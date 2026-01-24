"use client";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CarouselScreenshots } from "@/app/about/components/carousel";
import { ContainerScroll } from "@/app/about/components/container-scroll-animation";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/app/about/components/glowing-stars";
import { Tabs } from "@/app/about/components/tabs";
import { Widget } from "@/app/about/components/widget";
import { WobbleCard } from "@/app/about/components/wobble-card";
import { LINK_MANAGER_URL } from "@/lib/constants";

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
    description:
      "Fast TypeScript ORM that I used to query the database with amazing developer experience.",
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
    description:
      "React framework that I used to build all the UI including the dashboard and this page.",
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
    description:
      "The API for the link manager. The part that handles the redirections, links, and analytics.",
  },
  {
    title: "Front-end",
    link: "https://github.com/axeelz/link-manager-dashboard",
    description:
      "The visual interface for the link manager. It allows me to manage links, see analytics, and more.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 flex w-full justify-start p-4">
        <Link
          href="https://axeelz.com/"
          className="inline-flex gap-1 rounded-full bg-gray-200 px-8 py-2 text-black focus:ring-2 focus:ring-blue-400"
        >
          <ArrowLeft className="h-6 w-6" />
          My portfolio
        </Link>
      </div>

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-3xl font-semibold text-black md:text-4xl dark:text-white">
                <span className="text-muted-foreground">{new URL(LINK_MANAGER_URL).hostname}</span>,
                my personal <br />
                <span className="mt-1 text-4xl leading-none font-bold md:text-[6rem]">
                  Link&nbsp;Manager
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/links.webp`}
            priority={true}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <main className="mx-auto max-w-7xl p-4 sm:px-6 sm:py-0">
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-900 min-h-[300px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-white md:text-xl lg:text-3xl">
                Create and manage short links easily.
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                With a simple and easy-to-use interface, the link manager allows me to share short
                links that redirect to any URL, or even serve static files.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-pink-800">
            <h2 className="max-w-80  text-left text-base font-semibold tracking-[-0.015em] text-balance text-white md:text-xl lg:text-3xl">
              No more broken links.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              The link manager makes it easy to keep track of links I shared and edit where they
              redirect to at any time.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[300px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm text-left  text-base font-semibold tracking-[-0.015em] text-balance text-white md:max-w-lg md:text-xl lg:text-3xl">
                Keep track of their performance.
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                It also provides insights into how many times a link was clicked, where the clicks
                came from, and basic info about the visitors.
              </p>
            </div>
          </WobbleCard>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Screenshots</h2>

          <div className="my-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-500 py-8 md:hidden">
            <CarouselScreenshots />
          </div>

          <div className="b relative mt-8 mb-40 hidden h-[20rem] w-full flex-col items-start justify-start [perspective:1000px] md:flex md:h-[40rem]">
            <Tabs tabs={tabs} />
          </div>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Example</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Here is an example of a redirection handled by the link manager. See where it redirects
            you to!
          </p>

          <div className="py-8">
            <InteractiveDemo />
          </div>
        </div>

        <div className="pt-20">
          <h2 className="text-3xl font-bold text-black dark:text-white">Technologies</h2>
          <p className="mt-4 text-muted-foreground">
            The link manager is a full-stack application built with several technologies that I love
            or wanted to try.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-8 antialiased md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((technology) => (
              <GlowingStarsBackgroundCard key={technology.title}>
                <GlowingStarsTitle>{technology.title}</GlowingStarsTitle>
                <div className="mt-2 flex items-end justify-between">
                  <GlowingStarsDescription>{technology.description}</GlowingStarsDescription>
                  <Link href={technology.link} target="_blank">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
                      <ExternalLink className="h-4 w-4 text-white" />
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
            The link manager is open-source and available on GitHub. Feel free to check it out, open
            issues, and discuss.
          </p>

          <div className="align-center flex flex-wrap gap-6 py-8">
            {sources.map((source) => (
              <Widget
                key={source.title}
                title={source.title}
                description={source.description}
                link={source.link}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
