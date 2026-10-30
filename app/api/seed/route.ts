import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product, Category, Brand, Blog, Settings, User } from '@/lib/models';
import { products, categories, brands, blogs } from '@/lib/seed-data';

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing data in the current database
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Brand.deleteMany({}),
      Blog.deleteMany({}),
      Settings.deleteMany({})
    ]);

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    const catMap = createdCategories.reduce((acc, cat) => {
      acc[cat.name] = cat._id;
      return acc;
    }, {} as Record<string, any>);

    // Seed Brands
    const createdBrands = await Brand.insertMany(brands);
    const brandMap = createdBrands.reduce((acc, brand) => {
      acc[brand.name] = brand._id;
      return acc;
    }, {} as Record<string, any>);

    // Seed Blogs
    await Blog.insertMany(blogs);

    // Seed Products
    const productsWithRefs = products.map(p => ({
      ...p,
      category: catMap[p.categoryName],
      brand: brandMap[p.brandName]
    }));

    await Product.insertMany(productsWithRefs);

    // Seed Settings for Tawwakal Automation
    await Settings.create({
      autoBackgroundRemoval: false,
      applyWatermark: true,
      watermarkText: 'Tawwakal Automation',
      geminiModel: 'gemini-2.5-flash'
    });

    // Ensure Admin Users exist
    const adminHash = '$2b$10$ycVVpYmhtQaRYJi07NnqieaN5SX9Cjc8nxLCbh7asWPPyzuIwDCd2';
    const usersToCreate = [
      { name: 'Tawwakal Admin', email: 'alfazbilakhiya17@gmail.com', password: adminHash },
      { name: 'Admin', email: 'coronamarine@gmail.com', password: adminHash }
    ];

    for (const u of usersToCreate) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
      }
    }

    return NextResponse.json({ 
      message: "Tawwakal Automation database seeded successfully", 
      stats: {
        categories: createdCategories.length,
        brands: createdBrands.length,
        products: products.length,
        blogs: blogs.length,
        settings: 1
      } 
    });
  } catch (error: any) {
    console.error("Critical Seeding Error:", error);
    return NextResponse.json({ 
      error: "Seeding failed", 
      detail: error.message 
    }, { status: 500 });
  }
}
