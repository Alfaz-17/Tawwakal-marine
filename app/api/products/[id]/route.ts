import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/lib/models';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { isValidObjectId } from 'mongoose';
import { getCache, setCache, invalidateCache } from '@/lib/cache';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cacheKey = `product:${id}`;
    const cachedProduct = getCache(cacheKey);
    if (cachedProduct) {
      return NextResponse.json(cachedProduct, {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectToDatabase();
    
    let product;
    if (isValidObjectId(id)) {
      product = await Product.findById(id).populate('category').populate('brand').lean();
    } else {
      product = await Product.findOne({ slug: id }).populate('category').populate('brand').lean();
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    setCache(cacheKey, product, 180); // 3 minutes

    return NextResponse.json(product, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Product GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    
    let deletedProduct;
    if (isValidObjectId(id)) {
      deletedProduct = await Product.findByIdAndDelete(id);
    } else {
      deletedProduct = await Product.findOneAndDelete({ slug: id });
    }

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    invalidateCache('product');
    invalidateCache('products');

    // Revalidate paths for SEO
    revalidatePath('/products');
    revalidatePath(`/product/${deletedProduct.slug || id}`);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    
    let updatedProduct;
    if (isValidObjectId(id)) {
      updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    } else {
      updatedProduct = await Product.findOneAndUpdate({ slug: id }, body, { new: true });
    }

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    invalidateCache('product');
    invalidateCache('products');

    // Revalidate paths for SEO
    revalidatePath('/products');
    revalidatePath(`/product/${updatedProduct.slug || id}`);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Product PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
