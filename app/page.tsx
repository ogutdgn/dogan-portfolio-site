import type { Metadata } from "next"
import Hero from "../components/hero"
import About from "../components/about"
import TechStack from "../components/tech-stack"
import Projects from "../components/projects"
import Blogs from "../components/blogs"
import Contact from "../components/contact"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import Education from "../components/education"

export const metadata: Metadata = {
  title: "Dogan Ogut | Portfolio",
  description: "Professional portfolio of Dogan Ogut - Software Developer",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
