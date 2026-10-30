
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/lib/models';
import { getSession } from '@/lib/auth';

export async function POST(
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
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.featured = !product.featured;
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error('Toggle Featured error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
