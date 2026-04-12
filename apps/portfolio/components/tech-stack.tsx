"use client"

import { Code2, Layout, Server, Database, Wrench, Binary } from "lucide-react"

export default function TechStack() {
  const technologies = {
    languages: {
      icon: <Code2 className="h-6 w-6" />,
      title: "Programming Languages",
      description: "Core languages for systems and application development",
      skills: ["Python", "TypeScript", "JavaScript", "Assembly", "C", "C++"],
    },
    concepts: {
      icon: <Binary className="h-6 w-6" />,
      title: "Engineering Concepts",
      description: "Fundamental software engineering principles",
      skills: ["Data Structures", "Algorithms", "OOP", "Design Patterns", "System Design", "Multithreading"],
    },
    frontend: {
      icon: <Layout className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Modern web development technologies",
      skills: ["React.js", "Next.js", "HTML/CSS", "Tailwind CSS", "Bootstrap", "Redux", "Zustand"],
    },
    backend: {
      icon: <Server className="h-6 w-6" />,
      title: "Backend Development",
      description: "Server-side frameworks and technologies",
      skills: ["Node.js", "Express", "Django", "Sanity"],
    },
    database: {
      icon: <Database className="h-6 w-6" />,
      title: "Database Systems",
      description: "Database management and optimization",
      skills: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    tools: {
      icon: <Wrench className="h-6 w-6" />,
      title: "Development Tools",
      description: "Tools and environments for development",
      skills: ["Git", "Docker", "Linux/Unix", "Visual Studio"],
    },
  }

  return (
    <section id="tech-stack" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left md:text-center">Technical Expertise</h2>
          <div className="w-20 h-1 bg-primary md:mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {Object.entries(technologies).map(([key, category]) => (
            <div
              key={key}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-left md:text-center text-muted-foreground">
          <p className="max-w-2xl md:mx-auto">
            With extensive experience in both low-level systems programming and modern web development, I bring a
            comprehensive understanding of software engineering principles to every project.
          </p>
        </div>
      </div>
    </section>
  )
}
