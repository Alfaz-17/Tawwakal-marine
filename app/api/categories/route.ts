import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const coreCategory = searchParams.get('coreCategory');
    const division = searchParams.get('division');

    const query: any = {};
    if (coreCategory) {
      query.coreCategory = coreCategory;
    }
    if (division) {
      query.$or = [{ division: division }, { division: 'general' }];
    }

    const categories = await Category.find(query).sort({ displayOrder: 1, name: 1 }).lean();
    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Categories GET error:', error);
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
    const category = await Category.create(body);
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
