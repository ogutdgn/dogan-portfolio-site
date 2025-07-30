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
              It's always been my dream to be useful to people and make their lives easier. 
              I'm striving to achieve this goal. I'm currently studying Computer Science at 
              a university in the United States, where I'm developing my skills in creating 
              high-quality software.
            </p>
            <p className="text-muted-foreground mb-6">
              My interest in software began in high school at the age of 15. Since then, I've made it my goal 
              to develop myself in various software areas. Currently, I'm developing my skills in building web 
              applications and platforms using FullStack Development and AI.
            </p>
            <p className="text-muted-foreground">
              I'm a university student who shares my experiences and projects in software development, 
              hoping they can be helpful to others who are on a similar path.
            </p>
            
          </div>

          <div className="grid grid-cols-1 gap-5">
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
