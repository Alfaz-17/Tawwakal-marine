
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ date: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Blogs GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const blog = await Blog.create(body);
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Blogs POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
