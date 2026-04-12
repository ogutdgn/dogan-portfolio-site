import { getProjects } from "@ogutdgn/sanity-shared"
import ProjectsClient from "@/components/projects-client"

export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsClient projects={projects} />
}
