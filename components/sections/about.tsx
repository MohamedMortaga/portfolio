import Image from "next/image";
import { Download, Mail } from "lucide-react";

import { profile } from "@/data/profile/profile";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center scroll-mt-20 py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        {/* ===== Text ===== */}
        <div className="order-2 flex flex-col gap-6 md:order-1">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              {profile.title}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {profile.name}
            </h1>
            {profile.location && (
              <p className="text-sm text-muted-foreground">
                {profile.location}
              </p>
            )}
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <a href={profile.cv} download className={cn(buttonVariants())}>
              <Download />
              Download CV
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Mail />
              Contact Me
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* ===== Image ===== */}
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src={profile.image}
            alt={profile.name}
            width={320}
            height={320}
            priority
            className="aspect-square rounded-full border-4 border-border object-cover"
          />
        </div>
      </div>
    </section>
  );
}