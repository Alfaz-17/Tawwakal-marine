import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { Product } from '@/lib/models'

// Google Merchant Center Product Feed
// Accessible at: /api/feed/google-merchant

export async function GET() {
  const baseUrl = 'https://tawwakalautomation.com'

  try {
    await connectDB()
    const products = await Product.find({}).populate('category').populate('brand').lean()

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Tawwakal Automation - Marine & Industrial Equipment</title>
    <link>${baseUrl}</link>
    <description>Marine equipment, ship spare parts, and industrial automation components from Tawwakal Automation</description>
`

    for (const product of products) {
      const p = product as any
      const slug = p.slug || p._id.toString()
      const brandName = p.brandName || p.brand?.name || 'Tawwakal Automation'
      const categoryName = p.category?.name || 'Marine Equipment'
      const imageUrl = p.image?.startsWith('http') ? p.image : `${baseUrl}${p.image}`
      const description = p.description
        ? escapeXml(p.description.substring(0, 5000))
        : escapeXml(`${p.title} - ${categoryName} supplied by Tawwakal Automation.`)

      let availability = 'in_stock'
      if (p.availability === 'out-of-stock') availability = 'out_of_stock'
      else if (p.availability === 'on-demand') availability = 'preorder'

      const condition = p.condition === 'new' ? 'new' : p.condition === 'refurbished' ? 'refurbished' : 'used'

      xml += `    <item>
      <g:id>${escapeXml(p._id.toString())}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${description}</g:description>
      <g:link>${baseUrl}/product/${slug}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
`

      if (p.images && Array.isArray(p.images)) {
        for (const additionalImg of p.images.slice(0, 10)) {
          const addUrl = additionalImg.startsWith('http') ? additionalImg : `${baseUrl}${additionalImg}`
          xml += `      <g:additional_image_link>${escapeXml(addUrl)}</g:additional_image_link>\n`
        }
      }

      xml += `      <g:condition>${condition}</g:condition>
      <g:availability>${availability}</g:availability>
      <g:brand>${escapeXml(brandName)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
`

      if (p.price && p.price > 0) {
        xml += `      <g:price>${p.price.toFixed(2)} USD</g:price>\n`
      }

      if (p.sku) {
        xml += `      <g:mpn>${escapeXml(p.sku)}</g:mpn>\n`
      }

      xml += `      <g:product_type>${escapeXml(categoryName)}</g:product_type>
    </item>
`
    }

    xml += `  </channel>
</rss>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Google Merchant feed generation error:', error)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title></channel></rss>`,
      { headers: { 'Content-Type': 'application/xml' } }
    )
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
