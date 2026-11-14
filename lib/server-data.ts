import connectToDatabase from '@/lib/db'
import { Product, Category, Brand, Blog } from '@/lib/models'
import mongoose from 'mongoose'

export async function getProductBySlug(slug: string) {
  try {
    await connectToDatabase()
    const isObjectId = mongoose.isValidObjectId(slug)
    const query = isObjectId
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug }

    const product = await Product.findOne(query)
      .populate('category', 'name slug _id')
      .populate('brand', 'name slug _id')
      .lean()

    if (!product) return null
    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    console.error('Error fetching product by slug in server-data:', error)
    return null
  }
}

export async function getAllProductSlugs() {
  try {
    await connectToDatabase()
    const products = await Product.find({}).select('slug _id').lean()
    return products.map((p: any) => p.slug || String(p._id)).filter(Boolean)
  } catch (error) {
    console.error('Error fetching product slugs in server-data:', error)
    return []
  }
}

export async function getCategoryBySlug(slugOrName: string) {
  try {
    await connectToDatabase()
    const isObjectId = mongoose.isValidObjectId(slugOrName)
    const decoded = decodeURIComponent(slugOrName)
    const regex = new RegExp(`^${decoded.replace(/-/g, '[ -]')}$`, 'i')

    const query = isObjectId
      ? { $or: [{ slug: decoded }, { _id: slugOrName }, { name: regex }] }
      : { $or: [{ slug: decoded }, { name: regex }] }

    const category = await Category.findOne(query).lean()
    if (!category) return null
    return JSON.parse(JSON.stringify(category))
  } catch (error) {
    console.error('Error fetching category in server-data:', error)
    return null
  }
}

export async function getAllCategories() {
  try {
    await connectToDatabase()
    const categories = await Category.find({}).sort({ displayOrder: 1, name: 1 }).lean()
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error('Error fetching all categories in server-data:', error)
    return []
  }
}

export async function getAllBrands() {
  try {
    await connectToDatabase()
    const brands = await Brand.find({}).sort({ name: 1 }).lean()
    return JSON.parse(JSON.stringify(brands))
  } catch (error) {
    console.error('Error fetching all brands in server-data:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await connectToDatabase()
    const isObjectId = mongoose.isValidObjectId(slug)
    const query = isObjectId
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug }

    const blog = await Blog.findOne(query).lean()
    if (!blog) return null
    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error('Error fetching blog in server-data:', error)
    return null
  }
}

export async function getAllBlogs() {
  try {
    await connectToDatabase()
    const blogs = await Blog.find({}).sort({ date: -1, createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error('Error fetching all blogs in server-data:', error)
    return []
  }
}
