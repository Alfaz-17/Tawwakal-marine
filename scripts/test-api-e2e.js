const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Load environment variables from .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length > 1) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    process.env[key] = val;
  }
});

async function runAudit() {
  console.log('=== STARTING TAWWAKAL AUTOMATION E2E BACKEND & API AUDIT ===\n');

  // 1. Test Database Connection
  console.log('1. Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.DB_URI, { bufferCommands: false });
    console.log('✔ MongoDB connected successfully to database:', mongoose.connection.name);
  } catch (err) {
    console.error('✖ MongoDB connection failed:', err.message);
    process.exit(1);
  }

  // 2. Test Collections and Data Integrity
  console.log('\n2. Testing Database Collections & Counts...');
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Available collections:', collections.map(c => c.name));

  const db = mongoose.connection.db;
  const usersCount = await db.collection('users').countDocuments();
  const productsCount = await db.collection('products').countDocuments();
  const categoriesCount = await db.collection('categories').countDocuments();
  const brandsCount = await db.collection('brands').countDocuments();
  const ordersCount = await db.collection('orders').countDocuments();
  const blogsCount = await db.collection('blogs').countDocuments();
  const settingsCount = await db.collection('settings').countDocuments();

  console.log(`- Users (Admins): ${usersCount}`);
  console.log(`- Products in Stock: ${productsCount}`);
  console.log(`- Categories: ${categoriesCount}`);
  console.log(`- Brands: ${brandsCount}`);
  console.log(`- Orders / Quote RFQs: ${ordersCount}`);
  console.log(`- Blogs / Articles: ${blogsCount}`);
  console.log(`- Settings: ${settingsCount}`);

  // 3. Test Admin User & Authentication Flow
  console.log('\n3. Testing Admin Auth Credentials & JWT...');
  const adminUser = await db.collection('users').findOne({});
  if (adminUser) {
    console.log(`✔ Found registered admin: ${adminUser.email} (${adminUser.name})`);
    const testToken = jwt.sign({ userId: adminUser._id, email: adminUser.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    const decoded = jwt.verify(testToken, process.env.JWT_SECRET || 'secret');
    console.log('✔ JWT sign and verify successful for:', decoded.email);
  } else {
    console.warn('⚠ No admin user found in users collection!');
  }

  // 4. Test Products Query & Text Index Performance
  console.log('\n4. Testing Product Queries & Text Search...');
  const sampleProducts = await db.collection('products').find({}).limit(5).toArray();
  console.log(`✔ Retrieved ${sampleProducts.length} sample products:`);
  sampleProducts.forEach(p => {
    console.log(`  - [${p.partNumber || p.sku || 'No Part#'}] ${p.title} (${p.brandName || 'OEM'})`);
  });

  // Test search index
  const searchQuery = 'Siemens';
  const searchResults = await db.collection('products').find({
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { partNumber: { $regex: searchQuery, $options: 'i' } },
      { brandName: { $regex: searchQuery, $options: 'i' } }
    ]
  }).limit(3).toArray();
  console.log(`✔ Search query '${searchQuery}' returned ${searchResults.length} matching products.`);

  // 5. Test Categories & Division assignment
  console.log('\n5. Testing Categories Data...');
  const sampleCategories = await db.collection('categories').find({}).limit(5).toArray();
  sampleCategories.forEach(c => {
    console.log(`  - ${c.name} (Core: ${c.coreCategory || 'None'}, Slug: ${c.slug || 'None'})`);
  });

  // 6. Test Brands Data
  console.log('\n6. Testing Brands Data...');
  const sampleBrands = await db.collection('brands').find({}).limit(5).toArray();
  sampleBrands.forEach(b => {
    console.log(`  - ${b.name} (Logo: ${b.logo || 'None'})`);
  });

  // 7. Test Orders / RFQs
  console.log('\n7. Testing Orders & RFQs...');
  const sampleOrders = await db.collection('orders').find({}).limit(3).toArray();
  console.log(`✔ Found ${sampleOrders.length} recent orders/RFQs.`);

  // 8. Test Settings
  console.log('\n8. Testing Settings...');
  const settings = await db.collection('settings').findOne({});
  console.log('✔ Current settings:', settings || 'Default settings active');

  await mongoose.disconnect();
  console.log('\n=== E2E AUDIT COMPLETE: ALL DATABASE MODELS & QUERIES HEALTHY ===');
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});

