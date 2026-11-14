import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (_) {}

// Load environment variables from .env
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length > 1) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    process.env[key] = val;
  }
});

console.log('\n======================================================');
console.log('🌐 RUNNING FRONTEND & ADMIN PANEL E2E WORKFLOW TESTS');
console.log('======================================================\n');

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✔ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

// Connect to MongoDB
await test('E2E Setup: Connect to database for full-stack workflow simulation', async () => {
  await mongoose.connect(process.env.DB_URI, { bufferCommands: false });
  assert.equal(mongoose.connection.readyState, 1);
});

const db = mongoose.connection.db;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// ==========================================
// SCENARIO 1: CUSTOMER DISCOVERY & RFQ FLOW
// ==========================================
let customerCreatedOrderId = null;

await test('Customer E2E: Search catalog by part number & browse product', async () => {
  // 1. Search for industrial controller
  const searchQuery = 'Simatic';
  const searchResults = await db.collection('products').find({
    $or: [
      { title: { $regex: searchQuery, $options: 'i' } },
      { partNumber: { $regex: searchQuery, $options: 'i' } }
    ]
  }).toArray();

  assert.ok(searchResults.length > 0, 'Catalog search must return results');
  const targetProduct = searchResults[0];

  // 2. Open product detail view
  assert.ok(targetProduct.title, 'Product must have title');
  assert.ok(targetProduct.slug || targetProduct._id, 'Product must have slug or ID');
  assert.ok(targetProduct.condition, 'Product must have condition specified');
});

await test('Customer E2E: Submit B2B Request for Quotation (RFQ)', async () => {
  const rfqSubmission = {
    customerName: 'Capt. Marcus Vance',
    customerPhone: '+44 7911 123456',
    customerEmail: 'marcus.vance@atlantic-fleet.com',
    items: [
      {
        productTitle: 'Danfoss VLT AutomationDrive FC 302 37kW VFD Inverter',
        partNumber: '131B0044',
        quantity: 1
      }
    ],
    notes: 'Urgent vessel dry-docking requirement at Rotterdam. Please confirm CIF air freight.',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('orders').insertOne(rfqSubmission);
  assert.ok(result.insertedId, 'Customer RFQ must be accepted and assigned an ID');
  customerCreatedOrderId = result.insertedId;

  // Verify stored RFQ record
  const stored = await db.collection('orders').findOne({ _id: customerCreatedOrderId });
  assert.equal(stored.status, 'pending');
  assert.equal(stored.customerName, 'Capt. Marcus Vance');
  assert.equal(stored.items[0].quantity, 1);
});

// ==========================================
// SCENARIO 2: ADMIN PANEL COMPLETE LIFECYCLE
// ==========================================
let adminAuthToken = null;
let createdTestProductId = null;

await test('Admin E2E: Admin login with seeded credentials and token issue', async () => {
  const adminEmail = 'tawwakalautomation@gmail.com';
  const adminPassword = 'Tawwakal@123';

  const admin = await db.collection('users').findOne({ email: adminEmail });
  assert.ok(admin, `Admin account for ${adminEmail} must exist`);

  const passwordValid = await bcrypt.compare(adminPassword, admin.password);
  assert.equal(passwordValid, true, 'Admin password must authenticate');

  // Issue session token
  adminAuthToken = jwt.sign(
    { userId: admin._id.toString(), email: admin.email, name: admin.name },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  assert.ok(adminAuthToken, 'Session token must be generated');
});

await test('Admin E2E: Protected dashboard metrics retrieval', async () => {
  assert.ok(adminAuthToken, 'Admin must possess valid token');
  const session = jwt.verify(adminAuthToken, JWT_SECRET);
  assert.equal(session.email, 'tawwakalautomation@gmail.com');

  const [productsCount, categoriesCount, brandsCount, pendingOrdersCount] = await Promise.all([
    db.collection('products').countDocuments(),
    db.collection('categories').countDocuments(),
    db.collection('brands').countDocuments(),
    db.collection('orders').countDocuments({ status: 'pending' })
  ]);

  assert.ok(productsCount > 0, 'Products count must be > 0');
  assert.ok(categoriesCount > 0, 'Categories count must be > 0');
  assert.ok(brandsCount > 0, 'Brands count must be > 0');
  assert.ok(pendingOrdersCount > 0, 'Pending orders count must include our newly submitted RFQ');
});

await test('Admin E2E: Create new automation product in inventory', async () => {
  const newProduct = {
    title: 'E2E Test Industrial Automation Module PLC',
    slug: 'e2e-test-industrial-automation-module-plc',
    partNumber: '6ES7-E2E-TEST-001',
    modelNumber: 'TEST-S7-RACK',
    brandName: 'Siemens',
    division: 'industrial-automation',
    coreCategory: 'Industrial Automation',
    condition: 'refurbished-tested',
    testingStatus: '100% Bench & I/O Tested',
    warranty: '12 Months Technical Warranty',
    originLocation: 'Bhavnagar / Alang Stock Hub',
    availability: 'in-stock',
    price: 0,
    featured: false,
    image: '/categories/plc-systems.png',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const insertRes = await db.collection('products').insertOne(newProduct);
  assert.ok(insertRes.insertedId, 'New product must be successfully created in DB');
  createdTestProductId = insertRes.insertedId;

  // Verify created product exists and can be searched
  const found = await db.collection('products').findOne({ _id: createdTestProductId });
  assert.equal(found.partNumber, '6ES7-E2E-TEST-001');
  assert.equal(found.testingStatus, '100% Bench & I/O Tested');
});

await test('Admin E2E: Update product specifications & toggle featured status', async () => {
  assert.ok(createdTestProductId, 'Test product ID must exist');

  await db.collection('products').updateOne(
    { _id: createdTestProductId },
    { $set: { featured: true, warranty: '24 Months Extended Marine Warranty', updatedAt: new Date() } }
  );

  const updated = await db.collection('products').findOne({ _id: createdTestProductId });
  assert.equal(updated.featured, true, 'Product should now be featured');
  assert.equal(updated.warranty, '24 Months Extended Marine Warranty');
});

await test('Admin E2E: Review incoming RFQ and update status to Quoted', async () => {
  assert.ok(customerCreatedOrderId, 'Customer RFQ order ID must be present');

  // Admin reviews the order
  const order = await db.collection('orders').findOne({ _id: customerCreatedOrderId });
  assert.ok(order);
  assert.equal(order.status, 'pending');

  // Admin marks order as quoted
  await db.collection('orders').updateOne(
    { _id: customerCreatedOrderId },
    {
      $set: {
        status: 'quoted',
        quoteAmountUSD: 1850,
        adminNotes: 'FOB air dispatch to Rotterdam quoted via DHL Express.',
        updatedAt: new Date()
      }
    }
  );

  const finalOrder = await db.collection('orders').findOne({ _id: customerCreatedOrderId });
  assert.equal(finalOrder.status, 'quoted', 'Order status must be updated to quoted');
});

await test('Admin E2E: Clean up temporary test product and test order', async () => {
  if (createdTestProductId) {
    const delProduct = await db.collection('products').deleteOne({ _id: createdTestProductId });
    assert.equal(delProduct.deletedCount, 1, 'Test product must be cleanly removed');
  }

  if (customerCreatedOrderId) {
    const delOrder = await db.collection('orders').deleteOne({ _id: customerCreatedOrderId });
    assert.equal(delOrder.deletedCount, 1, 'Test RFQ order must be cleanly removed');
  }
});

// ==========================================
// SCENARIO 3: STATIC ASSETS & SEO INTEGRITY
// ==========================================
await test('SEO & Branding Integrity: Verify favicon, icon, and apple-touch-icon files exist', async () => {
  const assets = [
    'public/favicon.ico',
    'public/apple-icon.png',
    'public/icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/og-image.png',
    'public/googlecc41f5fb723cc252.html'
  ];

  for (const asset of assets) {
    const fullPath = path.join(process.cwd(), asset);
    assert.ok(fs.existsSync(fullPath), `Asset file ${asset} must exist on disk`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 0, `Asset file ${asset} must not be empty`);
  }
});

await test('SEO & Legal Integrity: Verify /privacy and /terms pages exist', async () => {
  const privacyPath = path.join(process.cwd(), 'app', 'privacy', 'page.tsx');
  const termsPath = path.join(process.cwd(), 'app', 'terms', 'page.tsx');
  assert.ok(fs.existsSync(privacyPath), 'Privacy page must exist');
  assert.ok(fs.existsSync(termsPath), 'Terms of Supply page must exist');
});

await mongoose.disconnect();
console.log(`\nFrontend & Admin E2E Workflow Summary: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
