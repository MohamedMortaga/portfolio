"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Info, X } from "lucide-react";

import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/**
 * Uses the native <dialog> element: Escape, focus trapping and the
 * backdrop come for free from the browser.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Remember which image failed, so switching projects needs no reset
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgError = project !== null && failedSrc === project.image;

  // Open / close the dialog when the selected project changes
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden"; // lock page scroll
    } else if (dialog.open) {
      dialog.close();
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Clicking the dark backdrop (the dialog itself, not its content) closes it
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95"
    >
      {project && (
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Image */}
          <div className="relative aspect-video border-b bg-muted">
            {imgError ? (
              <div className="absolute inset-0 grid place-items-center font-mono text-sm text-muted-foreground">
                {project.title}
              </div>
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                onError={() => setFailedSrc(project.image)}
                className="object-cover object-top"
              />
            )}

            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            {project.imageNote && (
              <p className="flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                <Info className="size-3.5 text-[#e05d5d]" />
                {project.imageNote}
              </p>
            )}

            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h3>

            <p className="leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[#e05d5d]" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div>
              <p className="mb-2 font-mono text-xs text-muted-foreground">
                {"// tech stack"}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3 border-t pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants()}
                  >
                    Visit site
                    <ArrowUpRight />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Code2 />
                    Source code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}