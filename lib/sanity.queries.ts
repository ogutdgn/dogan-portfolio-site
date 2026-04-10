import { groq } from 'next-sanity';
import { client } from './sanity.client';

const fetchOptions = { cache: 'no-store' } as const;

// Projects
export async function getProjects() {
  const query = groq`*[_type == "project"] {
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
  } | order(_createdAt desc)`;
  return client.fetch(query, {}, fetchOptions);
}

export async function getProject(slug: string) {
  const query = groq`*[_type == "project" && slug.current == $slug][0] {
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
  }`;
  return client.fetch(query, { slug }, fetchOptions);
}

// Blogs
export async function getBlogs() {
  const query = groq`*[_type == "blog"] {
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
  } | order(publishedAt desc)`;
  return client.fetch(query, {}, fetchOptions);
}

export async function getBlogBySlug(slug: string) {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
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
  }`;
  return client.fetch(query, { slug }, fetchOptions);
}

// Similar Projects
export async function getSimilarProjects(currentProjectId: string, mainCategory?: string, tags: string[] = []) {
  const query = groq`*[_type == "project" && _id != $currentProjectId] {
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
  } | order(publishedAt desc)`;

  const projects = await client.fetch(query, { currentProjectId }, fetchOptions);

  const projectsWithScore = projects.map((project: any) => {
    let score = 0;
    if (project.mainCategory === mainCategory) score += 10;
    const commonTags = tags.filter(tag => project.tags?.includes(tag));
    score += commonTags.length * 3;
    const commonTech = tags.filter(tag => project.technologies?.includes(tag));
    score += commonTech.length * 2;
    return { ...project, similarityScore: score };
  });

  return projectsWithScore
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}

// Similar Blogs
export async function getSimilarBlogs(currentBlogId: string, mainCategory?: string, tags: string[] = []) {
  const query = groq`*[_type == "blog" && _id != $currentBlogId] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    mainCategory,
    tags,
    _createdAt
  } | order(publishedAt desc)`;

  const blogs = await client.fetch(query, { currentBlogId }, fetchOptions);

  const blogsWithScore = blogs.map((blog: any) => {
    let score = 0;
    if (blog.mainCategory === mainCategory) score += 10;
    const commonTags = tags.filter(tag => blog.tags?.includes(tag));
    score += commonTags.length * 3;
    return { ...blog, similarityScore: score };
  });

  return blogsWithScore
    .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
}
