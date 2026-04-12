import { groq } from 'next-sanity';
import { client } from '../client';
import type { Project, Blog } from '../types';

// Projects
export async function getProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(_createdAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    description,
    content,
    publishedAt,
    _createdAt
  }`, { slug });
}

export async function getSimilarProjects(currentProjectId: string, mainCategory?: string, tags: string[] = []): Promise<Project[]> {
  const projects = await client.fetch<Project[]>(groq`*[_type == "project" && _id != $currentProjectId] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    mainCategory,
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(publishedAt desc)`, { currentProjectId });

  return projects
    .map((project) => {
      let score = 0;
      if (project.mainCategory === mainCategory) score += 10;
      score += (tags.filter(tag => project.tags?.includes(tag)).length) * 3;
      score += (tags.filter(tag => project.technologies?.includes(tag)).length) * 2;
      return { ...project, similarityScore: score };
    })
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}

// Blogs
export async function getBlogs(): Promise<Blog[]> {
  return client.fetch(groq`*[_type == "blog"] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    readingTime,
    mainImage,
    mainCategory,
    tags,
    _createdAt
  } | order(publishedAt desc)`);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return client.fetch(groq`*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readingTime,
    mainImage,
    mainCategory,
    tags,
    content,
    body,
    description,
    _createdAt
  }`, { slug });
}

export async function getSimilarBlogs(currentBlogId: string, mainCategory?: string, tags: string[] = []): Promise<Blog[]> {
  const blogs = await client.fetch<Blog[]>(groq`*[_type == "blog" && _id != $currentBlogId] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    mainCategory,
    tags,
    _createdAt
  } | order(publishedAt desc)`, { currentBlogId });

  return blogs
    .map((blog) => {
      let score = 0;
      if (blog.mainCategory === mainCategory) score += 10;
      score += (tags.filter(tag => blog.tags?.includes(tag)).length) * 3;
      return { ...blog, similarityScore: score };
    })
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}
