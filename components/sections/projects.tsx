"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { Project } from "@/types";
import { projects } from "@/data/projects/projects";
import SectionHeading from "@/components/shared/section-heading";
import ProjectCard from "@/components/shared/project-card";
import ProjectModal from "@/components/shared/project-modal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 3;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - visible.length;

  return (
    <section id="projects" className="scroll-mt-20 border-y bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="03"
          title="Projects"
          description="Banking platforms I shipped professionally, plus things I built while learning."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={setSelected}
            />
          ))}
        </div>

        {(hiddenCount > 0 || showAll) && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {showAll ? "Show less" : `Show all projects (+${hiddenCount})`}
              <ChevronDown
                className={cn("transition-transform", showAll && "rotate-180")}
              />
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}