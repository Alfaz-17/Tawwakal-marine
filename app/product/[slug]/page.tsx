import { Metadata } from 'next'
import api from "@/lib/api"
import ProductDetailContent from './product-detail-content'
import ProductStructuredData from '@/components/seo/product-structured-data'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const { data: product } = await api.get(`/products/${slug}`)
    
    if (!product) {
      return {
        title: 'Product Not Found | Tawwakal Automation',
      }
    }

    const brandName = product.brandName || (product.brand?.name) || ''
    const categoryName = product.category?.name || 'Marine & Industrial Equipment'
    
    const titleParts = [product.title]
    if (brandName) titleParts.push(`by ${brandName}`)
    titleParts.push(categoryName)
    titleParts.push('Tawwakal Automation')
    
    const title = product.metaTitle || titleParts.join(' | ')
    
    const description = product.metaDescription || (product.description 
      ? (product.description.length > 155 
          ? product.description.substring(0, 152) + "..." 
          : product.description)
      : `${product.title}${brandName ? ` by ${brandName}` : ''}. ${categoryName} supplied by Tawwakal Automation. Request a quotation or submit technical enquiry.`)

    const ogImage = product.image ? (product.image.startsWith('http') ? product.image : `https://tawwakalautomation.com${product.image}`) : 'https://tawwakalautomation.com/placeholder.jpg'

    const keywords: string[] = [
      product.title,
      ...(product.keywords || []),
      categoryName,
      brandName,
      'Tawwakal Automation',
      'marine spare parts',
      'ship spare parts',
      'industrial automation',
      `${product.title} supplier`,
    ].filter(Boolean)

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `https://tawwakalautomation.com/product/${slug}`,
      },
      openGraph: {
        title: `${product.title}${brandName ? ` by ${brandName}` : ''} | Tawwakal Automation`,
        description,
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${product.title} - Tawwakal Automation`,
        }],
        url: `https://tawwakalautomation.com/product/${slug}`,
        type: 'article',
        siteName: 'Tawwakal Automation',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.title} | Tawwakal Automation`,
        description,
        images: [ogImage],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    const readableTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    return {
      title: `${readableTitle} | Tawwakal Automation`,
      description: `Marine and industrial equipment enquiry for ${readableTitle}. Tawwakal Automation.`,
      keywords: [readableTitle, 'Tawwakal Automation', 'marine equipment', 'spare parts'],
    }
  }
}

export async function generateStaticParams() {
  try {
    const { data: products } = await api.get('/products')
    if (!Array.isArray(products)) return []
    return products.map((product: any) => ({
      slug: product.slug || product._id,
    }))
  } catch (error) {
    return []
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const { data: product } = await api.get(`/products/${slug}`);
    
    if (!product) return <ProductDetailContent slug={slug} />;

    return (
      <>
        <ProductStructuredData product={product} slug={slug} />
        <ProductDetailContent slug={slug} />
      </>
    );
  } catch (err) {
    return <ProductDetailContent slug={slug} />;
  }
}
