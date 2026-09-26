export type NavLink = {
  label: string;
  href: `#${string}`;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Future Work", href: "#future-work" },
  { label: "Contact", href: "#contact" },
];