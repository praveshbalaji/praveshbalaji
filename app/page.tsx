import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Stack } from "@/components/stack";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Credentials } from "@/components/credentials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Scroll3DBackground } from "@/components/scroll-3d-background";

export default function Home() {
  return (
    <>
      <div className="blueprint-grid" aria-hidden="true" />
      <Scroll3DBackground />
      <Nav />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Credentials />
      <Contact />
      <Footer />
    </>
  );
}
