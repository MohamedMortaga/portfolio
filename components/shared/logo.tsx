import { cn } from "@/lib/utils";

/**
 * MM monogram: a solid "M" with an accent "echo" offset behind it —
 * the same offset-frame motif used on the About photo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <path
        d="M10 36V12l14 14 14-14v24"
        stroke="#e05d5d"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 3)"
      />
      <path
        d="M10 36V12l14 14 14-14v24"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-mono text-sm font-semibold tracking-tight">
        mortaga<span className="text-[#e05d5d]">.</span>
      </span>
    </span>
  );
}