import { BookOpen, CircleDashed, Loader, type LucideIcon } from "lucide-react";

import { futureWork } from "@/data/future-work/future-work";
import type { FutureStatus } from "@/types";
import SectionHeading from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  FutureStatus,
  { label: string; icon: LucideIcon; pill: string; dot: string; bar: string }
> = {
  learning: {
    label: "Learning",
    icon: BookOpen,
    pill: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    bar: "bg-sky-500",
  },
  "in-progress": {
    label: "In progress",
    icon: Loader,
    pill: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  planned: {
    label: "Planned",
    icon: CircleDashed,
    pill: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    bar: "bg-muted-foreground",
  },
};

export default function FutureWork() {
  return (
    <section id="future-work" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="04"
          title="Future Work"
          description="What I'm learning right now and what I'm planning to build next."
        />

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {futureWork.map((item, i) => {
            const s = statusStyles[item.status];
            const isPlanned = item.status === "planned";
            const Icon = s.icon;

            return (
              <li
                key={item.title}
                className={cn(
                  "relative flex flex-col gap-4 rounded-2xl p-6 transition-colors",
                  isPlanned
                    ? "border-2 border-dashed hover:border-[#e05d5d]/50"
                    : "border bg-card hover:border-[#e05d5d]/50"
                )}
              >
                {/* Step number */}
                <span className="absolute right-6 top-6 font-mono text-4xl font-semibold text-muted-foreground/20">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Status pill */}
                <span
                  className={cn(
                    "flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                    s.pill
                  )}
                >
                  {item.status === "learning" ? (
                    <span className="relative flex size-2">
                      <span
                        className={cn(
                          "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                          s.dot
                        )}
                      />
                      <span
                        className={cn("relative inline-flex size-2 rounded-full", s.dot)}
                      />
                    </span>
                  ) : (
                    <Icon className="size-3.5" />
                  )}
                  {s.label}
                </span>

                <h3 className="pr-12 text-lg font-semibold leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* Progress */}
                {typeof item.progress === "number" && (
                  <div className="mt-auto pt-2">
                    <div className="mb-2 flex justify-between font-mono text-xs text-muted-foreground">
                      <span>progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", s.bar)}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}