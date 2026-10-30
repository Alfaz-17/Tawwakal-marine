import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    
    // The broken URL to find
    const brokenUrl = "https://images.pexels.com/photos/163726/pexels-photo-163726.jpeg";
    
    // The working replacement URL
    const newUrl = "https://images.unsplash.com/photo-1621905251189-08b95d63329f?q=80&w=2069&auto=format&fit=crop";

    const result = await Product.updateMany(
      { image: brokenUrl },
      { $set: { image: newUrl } }
    );

    return NextResponse.json({ 
      message: 'Database update complete', 
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount 
    });
  } catch (error) {
    console.error('Fix DB error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
