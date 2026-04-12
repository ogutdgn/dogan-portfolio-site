import { NextResponse } from 'next/server';
import { getProject } from '@ogutdgn/sanity-shared';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
