import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import { Product, Category, Brand } from '@/lib/models'

const INDEXNOW_KEY = '41e46c7f8a7d425b966f365bc9fa4219'
const HOST = 'tawwakalautomation.com'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

export async function POST(req: Request) {
  return handleIndexNow(req)
}

export async function GET(req: Request) {
  return handleIndexNow(req)
}

async function handleIndexNow(req: Request) {
  try {
    let urlList: string[] = []

    try {
      const body = await req.json().catch(() => null)
      if (body && Array.isArray(body.urls) && body.urls.length > 0) {
        urlList = body.urls
      }
    } catch {
      // ignore
    }

    if (urlList.length === 0) {
      await connectToDatabase()
      const [products, categories, brands] = await Promise.all([
        Product.find({}).select('slug _id').limit(100).lean(),
        Category.find({}).select('slug _id').lean(),
        Brand.find({}).select('name _id').lean(),
      ])

      const baseUrl = `https://${HOST}`
      urlList = [
        baseUrl,
        `${baseUrl}/products`,
        `${baseUrl}/brands`,
        `${baseUrl}/about`,
        `${baseUrl}/contact`,
        `${baseUrl}/services`,
        `${baseUrl}/blog`,
        ...products.map((p: any) => `${baseUrl}/product/${p.slug || p._id}`),
        ...categories.map((c: any) => `${baseUrl}/products/${c.slug || c._id}`),
        ...brands.map((b: any) => `${baseUrl}/brand/${encodeURIComponent(b.name)}`),
      ]
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList.slice(0, 10000), // IndexNow limit per submission
    }

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({
      success: true,
      status: res.status,
      submittedUrlsCount: payload.urlList.length,
      sampleUrls: payload.urlList.slice(0, 5),
    })
  } catch (error: any) {
    console.error('IndexNow submission error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
