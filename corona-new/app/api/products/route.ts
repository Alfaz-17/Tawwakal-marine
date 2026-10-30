import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product, Category, Brand } from '@/lib/models';
import { getSession } from '@/lib/auth';
import { isValidObjectId } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');
    const division = searchParams.get('division');
    const q = searchParams.get('q') || searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '0', 10);

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
        const foundCat = await Category.findOne({ slug: category }).lean();
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
        }).lean();
        if (foundBrand) {
          query.brand = (foundBrand as any)._id;
        } else {
          // Fallback to checking brandName field directly
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

    let productsQuery = Product.find(query)
      .populate('category', 'name slug division')
      .populate('brand', 'name logo')
      .sort({ createdAt: -1 });

    if (limit > 0) {
      productsQuery = productsQuery.limit(limit);
    }

    const products = await productsQuery.lean();
      
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
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
    console.log('Product created successfully:', product._id);
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Products POST error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      errors: error.errors,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error',
      detail: error.errors || error.stack || 'No detail available'
    }, { status: 500 });
  }
}
