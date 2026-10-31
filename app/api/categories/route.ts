import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/lib/models';
import { getSession } from '@/lib/auth';
import { getCache, setCache, invalidateCache } from '@/lib/cache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const coreCategory = searchParams.get('coreCategory') || '';
    const division = searchParams.get('division') || '';

    // Check fast in-memory cache
    const cacheKey = `categories:${coreCategory}:${division}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectToDatabase();

    const query: any = {};
    if (coreCategory) {
      query.coreCategory = coreCategory;
    }
    if (division) {
      query.$or = [{ division: division }, { division: 'general' }];
    }

    const categories = await Category.find(query)
      .select('name slug coreCategory division displayOrder description image')
      .sort({ displayOrder: 1, name: 1 })
      .lean();

    setCache(cacheKey, categories, 300); // 5 minutes cache

    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache': 'MISS',
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
    invalidateCache('categories');
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
