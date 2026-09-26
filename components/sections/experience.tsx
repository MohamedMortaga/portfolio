"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/data/experience/experience";
import type { Experience as ExperienceItem } from "@/types";
import SectionHeading from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "work", label: "Work", icon: Briefcase },
  { value: "training", label: "Training", icon: GraduationCap },
] as const;

type Tab = (typeof tabs)[number]["value"];

export default function Experience() {
  const [tab, setTab] = useState<Tab>("work");
  const items = experience.filter((item) => item.type === tab);

  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="02"
          title="Experience"
          description="Where I've worked and how I've kept learning along the way."
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Experience type"
          className="mb-12 inline-flex rounded-full border bg-muted/40 p-1"
        >
          {tabs.map(({ value, label, icon: Icon }) => {
            const count = experience.filter((i) => i.type === value).length;
            const isActive = tab === value;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(value)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
                <span
                  className={cn(
                    "rounded-full px-1.5 font-mono text-xs",
                    isActive ? "bg-background/20" : "bg-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <ol className="relative">
          {items.map((item, i) => (
            <TimelineItem
              key={`${item.company}-${item.role}`}
              item={item}
              isLast={i === items.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  isLast,
}: {
  item: ExperienceItem;
  isLast: boolean;
}) {
  const isCurrent = item.endDate === "Present";

  return (
    <li className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      {/* Date column (desktop) */}
      <div className="hidden pt-5 text-right md:block">
        <p className="font-mono text-sm">
          {item.startDate} — {item.endDate}
        </p>
        {item.location && (
          <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
        )}
      </div>

      {/* Line + card */}
      <div className={cn("relative pl-8", !isLast && "pb-10")}>
        {/* vertical line */}
        {!isLast && (
          <span
            aria-hidden
            className="absolute left-[7px] top-7 h-full w-px bg-border"
          />
        )}
        {/* dot */}
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-6 grid size-[15px] place-items-center rounded-full border-2 border-[#e05d5d] bg-background",
            isCurrent && "bg-[#e05d5d]"
          )}
        >
          {isCurrent && (
            <span className="absolute size-full animate-ping rounded-full bg-[#e05d5d]/60" />
          )}
        </span>

        <article className="rounded-2xl border bg-card p-6 transition-colors hover:border-[#e05d5d]/50">
          {/* Date (mobile) */}
          <p className="mb-3 font-mono text-xs text-muted-foreground md:hidden">
            {item.startDate} — {item.endDate}
          </p>

          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <p className="text-[#e05d5d]">{item.company}</p>
            </div>
            {isCurrent && <Badge variant="outline">Current</Badge>}
          </div>

          {item.location && (
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground md:hidden">
              <MapPin className="size-3" />
              {item.location}
            </p>
          )}

          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            {item.achievements.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono">
                {t}
              </Badge>
            ))}
          </div>
        </article>
      </div>
    </li>
  );
}