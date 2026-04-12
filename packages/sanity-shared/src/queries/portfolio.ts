import { groq } from 'next-sanity';
import { client } from '../client';
import type { Project, Blog, BlogCategory, ProjectCategory } from '../types';

const CATEGORY_PROJECTION = `{ _id, title, "slug": slug.current }`;

// Projects
export async function getProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project" && !(_id in path("drafts.**"))] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(_createdAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(groq`*[_type == "project" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    projectType,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    githubLink,
    liveLink,
    description,
    content,
    publishedAt,
    _createdAt
  }`, { slug });
}

export async function getSimilarProjects(currentProjectId: string, mainCategory?: ProjectCategory, tags: string[] = []): Promise<Project[]> {
  const projects = await client.fetch<Project[]>(groq`*[_type == "project" && !(_id in path("drafts.**")) && _id != $currentProjectId] {
    _id,
    title,
    "slug": slug.current,
    overview,
    image,
    technologies,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    githubLink,
    liveLink,
    publishedAt,
    _createdAt
  } | order(publishedAt desc)`, { currentProjectId });

  return projects
    .map((project) => {
      let score = 0;
      if (mainCategory && project.mainCategory?._id === mainCategory._id) score += 10;
      score += (tags.filter(tag => project.tags?.includes(tag)).length) * 3;
      score += (tags.filter(tag => project.technologies?.includes(tag)).length) * 2;
      return { ...project, similarityScore: score };
    })
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}

// Blogs
export async function getBlogs(): Promise<Blog[]> {
  return client.fetch(groq`*[_type == "blog" && !(_id in path("drafts.**"))] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    readingTime,
    mainImage,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    _createdAt
  } | order(publishedAt desc)`);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return client.fetch(groq`*[_type == "blog" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readingTime,
    mainImage,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    content,
    body,
    description,
    _createdAt
  }`, { slug });
}

export async function getSimilarBlogs(currentBlogId: string, mainCategory?: BlogCategory, tags: string[] = []): Promise<Blog[]> {
  const blogs = await client.fetch<Blog[]>(groq`*[_type == "blog" && !(_id in path("drafts.**")) && _id != $currentBlogId] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    "mainCategory": mainCategory->${CATEGORY_PROJECTION},
    tags,
    _createdAt
  } | order(publishedAt desc)`, { currentBlogId });

  return blogs
    .map((blog) => {
      let score = 0;
      if (mainCategory && blog.mainCategory?._id === mainCategory._id) score += 10;
      score += (tags.filter(tag => blog.tags?.includes(tag)).length) * 3;
      return { ...blog, similarityScore: score };
    })
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}
