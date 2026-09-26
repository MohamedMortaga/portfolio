"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Info } from "lucide-react";

import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

const MAX_TECH = 3;

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const extraTech = project.tech.length - MAX_TECH;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-[#e05d5d]/50 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden border-b bg-muted">
        {imgError ? (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]">
            <span className="font-mono text-sm text-muted-foreground">
              {project.title}
            </span>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            onError={() => setImgError(true)}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {project.imageNote && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
            <Info className="size-3 text-[#e05d5d]" />
            Mockup
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          {/* The title button stretches over the whole card (after:inset-0) */}
          <h3 className="text-lg font-semibold leading-snug">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-left outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-[#e05d5d]"
            >
              {project.title}
            </button>
          </h3>

          {/* Links sit above the stretched button (relative z-10) */}
          <div className="relative z-10 flex shrink-0 gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="grid size-8 place-items-center rounded-full border bg-card transition-colors hover:bg-muted"
              >
                <Code2 className="size-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="grid size-8 place-items-center rounded-full border bg-card transition-colors hover:border-[#e05d5d] hover:bg-[#e05d5d] hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* One line only — full text lives in the modal */}
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.tech.slice(0, MAX_TECH).map((t) => (
            <Badge key={t} variant="secondary" className="font-mono">
              {t}
            </Badge>
          ))}
          {extraTech > 0 && (
            <Badge variant="outline" className="font-mono">
              +{extraTech}
            </Badge>
          )}
        </div>
      </div>
    </article>
  );
}