import { getProject } from "@/lib/sanity.queries"
import ProjectDetailClient from "@/components/project-detail-client"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
