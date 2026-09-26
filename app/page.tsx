import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import FutureWork from "@/components/sections/future-work";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <About />
      <Experience />
      <Projects />
      <FutureWork />
      <Contact />
    </main>
  );
}