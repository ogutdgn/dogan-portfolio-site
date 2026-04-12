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
import { getProjects, getBlogs } from "@ogutdgn/sanity-shared"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Dogan Ogut | Portfolio",
  description: "Professional portfolio of Dogan Ogut - Software Developer",
}

export default async function Home() {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogs()])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Projects projects={projects} />
        <Blogs blogs={blogs} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
