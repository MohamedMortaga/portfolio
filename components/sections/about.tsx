import Image from "next/image";
import { ArrowDownToLine, ArrowRight, MapPin } from "lucide-react";

import { profile } from "@/data/profile/profile";
import { projects } from "@/data/projects/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bankingCount = projects.filter((p) => p.title.startsWith("AAIB")).length;

const stats = [
  { value: `${projects.length}+`, label: "Projects built" },
  { value: bankingCount, label: "Banking platforms" },
  { value: `${profile.skills.length}+`, label: "Technologies" },
];

export default function About() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="about"
      className="relative isolate flex min-h-[calc(100vh-4rem)] scroll-mt-20 items-center overflow-hidden py-20"
    >
      {/* ===== Background: dot grid + glow ===== */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-1/4 -z-10 size-[28rem] rounded-full bg-[#e05d5d]/15 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 md:grid-cols-[1.2fr_1fr]">
        {/* ===== Text ===== */}
        <div className="order-2 flex flex-col gap-7 md:order-1">
          {/* Status pill */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to new opportunities
          </span>

          {/* Name + title */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-sm text-[#e05d5d]">
              {profile.title}
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {firstName}
              <br />
              <span className="text-muted-foreground">{lastName}</span>
            </h1>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Let&apos;s talk
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cv}
              download
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <ArrowDownToLine />
              Download CV
            </a>

            <div className="ml-1 flex items-center gap-1">
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-muted"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-75 dark:invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-2 grid max-w-md grid-cols-3 divide-x border-t pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0">
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ===== Photo ===== */}
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative w-64 sm:w-80 md:w-full md:max-w-sm">
            {/* Offset accent frame */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-[#e05d5d]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-2xl">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 768px) 384px, 320px"
                className="object-cover"
              />
            </div>

            {/* Floating location card */}
            {profile.location && (
              <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl border bg-background/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
                <MapPin className="size-4 text-[#e05d5d]" />
                {profile.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Skills strip ===== */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t bg-background/60 backdrop-blur md:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 font-mono text-xs text-muted-foreground">
          {profile.skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#e05d5d]" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}