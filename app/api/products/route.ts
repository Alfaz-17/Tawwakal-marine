import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product, Category, Brand } from '@/lib/models';
import { getSession } from '@/lib/auth';
import { isValidObjectId } from 'mongoose';
import { getCache, setCache, invalidateCache } from '@/lib/cache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');
    const division = searchParams.get('division');
    const q = searchParams.get('q') || searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    const cacheKey = `products:${category || ''}:${brand || ''}:${featured || ''}:${division || ''}:${q || ''}:${limit}:${page}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectToDatabase();

    const query: any = {};

    // Filter by Division (industrial-automation vs marine-automation)
    if (division) {
      query.$or = [
        { division: division },
        { division: 'both' }
      ];
    }

    // Filter by Category (slug or ObjectId)
    if (category) {
      if (isValidObjectId(category)) {
        query.category = category;
      } else {
        const foundCat = await Category.findOne({ slug: category }).select('_id').lean();
        if (foundCat) {
          query.category = (foundCat as any)._id;
        } else {
          return NextResponse.json([]);
        }
      }
    }

    // Filter by Brand (slug, name, or ObjectId)
    if (brand) {
      if (isValidObjectId(brand)) {
        query.brand = brand;
      } else {
        const foundBrand = await Brand.findOne({ 
          name: { $regex: new RegExp(`^${brand}$`, 'i') } 
        }).select('_id').lean();
        if (foundBrand) {
          query.brand = (foundBrand as any)._id;
        } else {
          query.brandName = { $regex: new RegExp(brand, 'i') };
        }
      }
    }

    if (featured === 'true') {
      query.featured = true;
    }

    // High-performance search for Part Number, Model Number, Title, Brand, SKU
    if (q && q.trim()) {
      const cleanQ = q.trim();
      const escapedQ = cleanQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapedQ, 'i');

      const searchQuery = {
        $or: [
          { partNumber: searchRegex },
          { modelNumber: searchRegex },
          { title: searchRegex },
          { brandName: searchRegex },
          { sku: searchRegex },
          { keywords: searchRegex }
        ]
      };

      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          searchQuery
        ];
        delete query.$or;
      } else {
        query.$or = searchQuery.$or;
      }
    }

    // Project only necessary fields for high-speed listing payload
    // Sort featured first, then newest, eliminating need for fallback roundtrips
    let productsQuery = Product.find(query)
      .select('title slug partNumber modelNumber brandName price availability condition image images category brand featured division originLocation warranty testingStatus sku')
      .populate('category', 'name slug division')
      .populate('brand', 'name logo')
      .sort({ featured: -1, createdAt: -1 });

    if (limit > 0) {
      const skip = (page - 1) * limit;
      if (skip > 0) {
        productsQuery = productsQuery.skip(skip);
      }
      productsQuery = productsQuery.limit(limit);
    }

    const products = await productsQuery.lean();

    // Cache results (shorter TTL for searches, longer for catalog)
    setCache(cacheKey, products, q ? 30 : 120);

    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Products GET error:', error);
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
    
    const product = await Product.create(body);
    invalidateCache('products');
    invalidateCache('product');
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Products POST error details:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
