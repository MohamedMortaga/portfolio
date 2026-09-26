import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string; // "02"
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 flex flex-col gap-3", className)}>
      <p className="font-mono text-sm text-[#e05d5d]">
        {"// "}
        {index}
      </p>
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}