import { Metadata } from 'next'
import { getBlogBySlug, getAllBlogs } from '@/lib/server-data'
import BlogDetailContent from './blog-detail-content'
import BlogStructuredData from '@/components/seo/blog-structured-data'
import Link from 'next/link'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const blog = await getBlogBySlug(slug)
    
    if (!blog) return { title: 'Article Not Found | Tawwakal Automation' }

    return {
      title: `${blog.title} | Tawwakal Automation`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.image ? [blog.image] : [],
        type: 'article',
        publishedTime: blog.date,
        url: `https://tawwakalautomation.com/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: blog.image ? [blog.image] : [],
      }
    }
  } catch (error) {
    return { title: 'Technical Guide | Tawwakal Automation' }
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs()
    return blogs.map((blog: any) => ({
      slug: blog.slug || String(blog._id),
    }))
  } catch (error) {
    console.error('generateStaticParams error in blog page:', error)
    return []
  }
}

export default async function BlogDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    
    if (!blog) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 pt-32">
          <h2 className="text-2xl font-bold text-[#0B153B]">Article Not Found</h2>
          <Link href="/blog" className="px-6 py-2.5 bg-[#008C95] text-white font-bold uppercase text-xs tracking-wider rounded">
            Return to Articles
          </Link>
        </div>
      );
    }

    return (
      <>
        <BlogStructuredData blog={blog} slug={slug} />
        <BlogDetailContent blog={blog} />
      </>
    );
  } catch (err) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 pt-32">
        <h2 className="text-2xl font-bold text-[#0B153B]">Unable to Load Article</h2>
        <Link href="/blog" className="px-6 py-2.5 bg-[#008C95] text-white font-bold uppercase text-xs tracking-wider rounded">
          Return to Blog
        </Link>
      </div>
    );
  }
}
