"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { navLinks } from "@/data/nav";
import { useActiveSection } from "@/hooks/use-active-section";
import Logo from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export default function Navbar() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a
          href="#about"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border bg-background/60 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors",
                    isActive
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:bg-muted/60"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="size-1.5 rounded-full bg-[#e05d5d]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}