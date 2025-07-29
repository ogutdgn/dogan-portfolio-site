"use client"

import { Code, Lightbulb, Rocket } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left md:text-center">Who I Am</h2>
          <div className="w-20 h-1 bg-primary md:mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">A Passionate Developer</h3>
            <p className="text-muted-foreground mb-6">
              I'm a software developer with a passion for creating clean, efficient, and user-friendly applications.
              With over 5 years of experience in the industry, I've worked on a variety of projects ranging from small
              business websites to complex enterprise applications.
            </p>
            <p className="text-muted-foreground mb-6">
              My journey in software development began when I was in college, where I discovered my love for solving
              complex problems through code. Since then, I've been continuously learning and improving my skills to stay
              at the forefront of technology.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing my knowledge through blog posts and community forums.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Clean Code</h4>
                  <p className="text-muted-foreground">
                    I write maintainable, scalable, and efficient code following best practices and industry standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Problem Solver</h4>
                  <p className="text-muted-foreground">
                    I enjoy tackling complex challenges and finding elegant solutions through creative thinking.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Fast Learner</h4>
                  <p className="text-muted-foreground">
                    I quickly adapt to new technologies and environments, constantly expanding my skill set.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
