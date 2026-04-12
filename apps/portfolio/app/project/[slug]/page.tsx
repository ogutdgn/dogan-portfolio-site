import type { Metadata } from "next"
import { getProject, urlFor } from "@ogutdgn/sanity-shared"
import ProjectDetailClient from "@/components/project-detail-client"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}

  const imageUrl = project.image ? urlFor(project.image).width(1200).height(630).url() : undefined

  return {
    title: `${project.title} | Dogan Ogut`,
    description: project.overview,
    openGraph: {
      title: project.title,
      description: project.overview,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://ogutdgn.com/project/${slug}`,
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
