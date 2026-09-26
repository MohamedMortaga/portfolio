import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

import { profile } from "@/data/profile/profile";
import SectionHeading from "@/components/shared/section-heading";
import ContactForm from "@/components/shared/contact-form";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t bg-muted/30 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Left: info */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            index="05"
            title="Let's work together"
            description="Have a role, a project or just a question? Send me a message and it lands straight in my inbox."
            className="mb-0"
          />

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-[#e05d5d]/50"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-[#e05d5d]/10">
                <Mail className="size-5 text-[#e05d5d]" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="text-sm font-medium break-all">{profile.email}</span>
              </span>
            </a>

            {profile.location && (
              <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
                <span className="grid size-10 place-items-center rounded-lg bg-[#e05d5d]/10">
                  <MapPin className="size-5 text-[#e05d5d]" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">{profile.location}</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid size-11 place-items-center rounded-full border bg-card transition-colors hover:border-[#e05d5d]/50"
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

        {/* Right: form */}
        <ContactForm />
      </div>
    </section>
  );
}