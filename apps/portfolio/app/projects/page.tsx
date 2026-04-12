import type { Metadata } from "next"
import { getProjects } from "@ogutdgn/sanity-shared"
import ProjectsClient from "@/components/projects-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Projects | Dogan Ogut",
  description: "Software projects built by Dogan Ogut — web apps, tools, and open source work.",
  openGraph: {
    title: "Projects | Dogan Ogut",
    description: "Software projects built by Dogan Ogut — web apps, tools, and open source work.",
    type: 'website',
  },
  alternates: {
    canonical: "https://ogutdgn.com/projects",
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsClient projects={projects} />
}
