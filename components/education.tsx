"use client"

import { GraduationCap, Calendar, MapPin } from "lucide-react"

export default function Education() {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Engineering",
      university: "University of Texas at Arlington",
      location: "Arlington, Texas",
      period: "2024 - 2028",
      status: "Current",
      description:
        "Focusing on software engineering, algorithms, and system design. Relevant coursework includes Data Structures, Object-Oriented Programming, Database Systems, and Software Engineering.",
      gpa: "3.7/4.0",
      achievements: [
        "Member of Computer Engineering Student Society",
        "Participated in ACM Programming Contest",
      ],
    },
  ]

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left md:text-center">Academic Background</h2>
          <div className="w-20 h-1 bg-primary md:mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 self-center md:self-start">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                      <h4 className="text-lg font-semibold text-primary mb-2">{edu.university}</h4>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                      <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                        {edu.status}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 text-left">{edu.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <h5 className="font-semibold mb-2">GPA</h5>
                      <p className="text-muted-foreground">{edu.gpa}</p>
                    </div>
                    <div className="text-left">
                      <h5 className="font-semibold mb-2">Key Achievements</h5>
                      <ul className="text-muted-foreground space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
