const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env to get the active DB_URI
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const dbUriMatch = envContent.match(/DB_URI=(.+)/);

if (!dbUriMatch || !dbUriMatch[1]) {
  console.error("No DB_URI found in .env");
  process.exit(1);
}

const targetUri = dbUriMatch[1].trim();

// SAFETY CHECK: Ensure it targets ONLY the new Tawwakal Automation cluster!
if (!targetUri.includes('tawwakalautomation_db_user')) {
  console.error("SAFETY BLOCK: DB_URI does not point to tawwakalautomation_db_user! Halting.");
  process.exit(1);
}

console.log("Verified Safe Target: " + targetUri.replace(/:[^:]+@/, ':****@'));

// Import updated seed data definitions from seed-data.ts directly or inline
const seedData = require('../lib/seed-data.ts');

async function runSeed() {
  try {
    console.log("Connecting to Tawwakal Automation MongoDB...");
    await mongoose.connect(targetUri);
    console.log("Connected to database: " + mongoose.connection.db.databaseName);

    // Schemas
    const CategorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      coreCategory: String,
      division: String,
      displayOrder: Number,
      description: String,
      image: String
    }, { timestamps: true });

    const BrandSchema = new mongoose.Schema({
      name: String,
      logo: String,
      description: String
    }, { timestamps: true });

    const ProductSchema = new mongoose.Schema({
      title: String,
      slug: String,
      partNumber: String,
      modelNumber: String,
      description: String,
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      coreCategory: String,
      division: String,
      brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
      brandName: String,
      condition: String,
      testingStatus: String,
      warranty: String,
      originLocation: String,
      availability: String,
      image: String,
      featured: Boolean
    }, { timestamps: true });

    const BlogSchema = new mongoose.Schema({
      title: String,
      slug: String,
      excerpt: String,
      content: String,
      image: String,
      date: { type: Date, default: Date.now }
    }, { timestamps: true });

    const SettingsSchema = new mongoose.Schema({
      autoBackgroundRemoval: Boolean,
      applyWatermark: Boolean,
      watermarkText: String,
      geminiModel: String
    }, { timestamps: true });

    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String
    }, { timestamps: true });

    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
    const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
    const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    console.log("Clearing existing data in new Tawwakal database...");
    await Promise.all([
      Category.deleteMany({}),
      Brand.deleteMany({}),
      Product.deleteMany({}),
      Blog.deleteMany({}),
      Settings.deleteMany({})
    ]);

    console.log("Seeding 25 Subcategories across 4 Core Sectors with authentic images...");
    const createdCats = await Category.insertMany(seedData.categories);
    const catMap = createdCats.reduce((acc, c) => ({ ...acc, [c.name]: c._id }), {});
    console.log(` - ${createdCats.length} Categories seeded.`);

    console.log("Seeding Brands...");
    const createdBrands = await Brand.insertMany(seedData.brands);
    const brandMap = createdBrands.reduce((acc, b) => ({ ...acc, [b.name]: b._id }), {});
    console.log(` - ${createdBrands.length} Brands seeded.`);

    console.log("Seeding Products with Part Numbers, Models & Images...");
    const productsWithRefs = seedData.products.map(p => ({
      ...p,
      category: catMap[p.categoryName],
      brand: brandMap[p.brandName]
    }));
    const createdProducts = await Product.insertMany(productsWithRefs);
    console.log(` - ${createdProducts.length} Products seeded.`);

    console.log("Seeding Blogs...");
    await Blog.insertMany(seedData.blogs);
    console.log(` - ${seedData.blogs.length} Blogs seeded.`);

    console.log("Seeding Settings...");
    await Settings.create({
      autoBackgroundRemoval: false,
      applyWatermark: true,
      watermarkText: 'Tawwakal Automation',
      geminiModel: 'gemini-2.5-flash'
    });
    console.log(" - Settings seeded with 'Tawwakal Automation' watermark.");

    console.log("Verifying Admin Users...");
    const adminHash = '$2b$10$ycVVpYmhtQaRYJi07NnqieaN5SX9Cjc8nxLCbh7asWPPyzuIwDCd2';
    const usersToCreate = [
      { name: 'Tawwakal Admin', email: 'alfazbilakhiya17@gmail.com', password: adminHash },
      { name: 'Admin', email: 'coronamarine@gmail.com', password: adminHash }
    ];

    for (const u of usersToCreate) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(` - Admin user created: ${u.email}`);
      }
    }

    console.log("\n========================================================");
    console.log(" SUCCESS! Tawwakal Automation database re-aligned!");
    console.log("========================================================");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed execution failed:", err);
    process.exit(1);
  }
}

runSeed();
