import { getProjects } from "@/lib/sanity.queries"
import ProjectsClient from "@/components/projects-client"

export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsClient projects={projects} />
}
