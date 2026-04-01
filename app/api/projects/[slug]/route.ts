import { NextResponse } from 'next/server';
import { getProject } from '@/lib/sanity.queries';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const project = await getProject(params.slug);
    if (!project) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
