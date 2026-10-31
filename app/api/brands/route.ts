import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Brand } from '@/lib/models';
import { getSession } from '@/lib/auth';
import { getCache, setCache, invalidateCache } from '@/lib/cache';

export async function GET() {
  try {
    const cacheKey = 'brands:all';
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectToDatabase();
    const brands = await Brand.find({})
      .select('name logo description')
      .sort({ name: 1 })
      .lean();

    setCache(cacheKey, brands, 600); // 10 minutes cache

    return NextResponse.json(brands, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Brands GET error:', error);
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
    const brand = await Brand.create(body);
    invalidateCache('brands');
    return NextResponse.json(brand);
  } catch (error) {
    console.error('Brands POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
