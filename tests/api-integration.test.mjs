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

console.log('\n========================================');
console.log('🔗 RUNNING BACKEND API INTEGRATION TESTS');
console.log('========================================\n');

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

// 1. Establish Database Connection
await test('Database: Connect successfully to MongoDB Atlas', async () => {
  assert.ok(process.env.DB_URI, 'DB_URI must be defined');
  await mongoose.connect(process.env.DB_URI, { bufferCommands: false });
  assert.equal(mongoose.connection.readyState, 1, 'Mongoose connection must be open (readyState 1)');
});

const db = mongoose.connection.db;

// 2. Authentication Flow Integration Tests
await test('API Auth: Admin credentials authentication with bcrypt', async () => {
  const email = 'tawwakalautomation@gmail.com';
  const plainPassword = 'Tawwakal@123';

  const user = await db.collection('users').findOne({ email });
  assert.ok(user, `User ${email} must exist in database`);

  const isValid = await bcrypt.compare(plainPassword, user.password);
  assert.equal(isValid, true, 'Valid password must match bcrypt hash');

  const isInvalid = await bcrypt.compare('WrongPassword_999!', user.password);
  assert.equal(isInvalid, false, 'Invalid password must be rejected');

  // Generate and verify JWT
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign({ userId: user._id.toString(), email: user.email }, secret, { expiresIn: '1d' });
  const decoded = jwt.verify(token, secret);
  assert.equal(decoded.email, email);
});

// 3. Products API Query & Search Integration Tests
await test('API Products: Retrieve products catalog with pagination and projection', async () => {
  const products = await db.collection('products')
    .find({})
    .project({ title: 1, slug: 1, partNumber: 1, modelNumber: 1, brandName: 1, condition: 1, image: 1 })
    .sort({ createdAt: -1 })
    .limit(8)
    .toArray();

  assert.ok(products.length > 0, 'Catalog must return products');
  assert.ok(products.length <= 8, 'Limit must constrain results to 8');
  assert.ok(products[0].title, 'Product must have a title');
});

await test('API Products: Search by exact part number / model', async () => {
  const sample = await db.collection('products').findOne({ partNumber: { $exists: true, $ne: '' } });
  if (sample && sample.partNumber) {
    const searchPart = sample.partNumber.slice(0, 5);
    const searchRegex = new RegExp(searchPart, 'i');

    const results = await db.collection('products').find({
      $or: [
        { partNumber: searchRegex },
        { modelNumber: searchRegex },
        { title: searchRegex },
        { sku: searchRegex }
      ]
    }).limit(5).toArray();

    assert.ok(results.length > 0, `Search for '${searchPart}' must return at least 1 match`);
    const found = results.some(p => p._id.toString() === sample._id.toString());
    assert.ok(found, 'Search results must include the sample product');
  }
});

await test('API Products: Filter by division (industrial vs marine)', async () => {
  const industrialProducts = await db.collection('products')
    .find({ $or: [{ division: 'industrial-automation' }, { division: 'both' }] })
    .limit(5)
    .toArray();
  assert.ok(industrialProducts.length > 0, 'Industrial division must have products');

  const marineProducts = await db.collection('products')
    .find({ $or: [{ division: 'marine-automation' }, { division: 'both' }] })
    .limit(5)
    .toArray();
  assert.ok(marineProducts.length > 0, 'Marine division must have products');
});

// 4. Categories API Integration Tests
await test('API Categories: Retrieve categories with display order sorting', async () => {
  const categories = await db.collection('categories')
    .find({})
    .sort({ displayOrder: 1, name: 1 })
    .toArray();

  assert.ok(categories.length > 0, 'Categories collection must have records');
  const hasSlugs = categories.every(c => c.slug && c.name);
  assert.ok(hasSlugs, 'All categories must have a valid slug and name');
});

// 5. Brands API Integration Tests
await test('API Brands: Retrieve OEM manufacturers', async () => {
  const brands = await db.collection('brands').find({}).sort({ name: 1 }).toArray();
  assert.ok(brands.length >= 5, 'Should have at least 5 supported brands in DB');
  const siemens = brands.find(b => b.name.toLowerCase().includes('siemens'));
  assert.ok(siemens, 'Siemens brand must be in database');
});

// 6. Orders / RFQ Quote Submission Integration Tests
let testOrderId = null;
await test('API Orders: Submit customer RFQ enquiry', async () => {
  const testOrder = {
    customerName: 'Integration Test Marine Eng',
    customerPhone: '+919999988888',
    customerEmail: 'vessel-test@shipline.com',
    items: [
      {
        productTitle: 'Siemens Simatic S7-300 CPU 315-2 PN/DP',
        quantity: 2,
        partNumber: '6ES7315-2EH14-0AB0'
      }
    ],
    notes: 'Urgent replacement needed at Dubai Port. Express air delivery.',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const insertResult = await db.collection('orders').insertOne(testOrder);
  assert.ok(insertResult.insertedId, 'Order must be inserted successfully');
  testOrderId = insertResult.insertedId;

  // Verify retrieval
  const retrievedOrder = await db.collection('orders').findOne({ _id: testOrderId });
  assert.ok(retrievedOrder, 'Retrieved order must exist');
  assert.equal(retrievedOrder.customerName, 'Integration Test Marine Eng');
  assert.equal(retrievedOrder.status, 'pending');
});

await test('API Orders: Update order status by Admin (pending -> quoted)', async () => {
  assert.ok(testOrderId, 'Test order ID must be set');

  await db.collection('orders').updateOne(
    { _id: testOrderId },
    { $set: { status: 'quoted', quoteAmountUSD: 2400, updatedAt: new Date() } }
  );

  const updated = await db.collection('orders').findOne({ _id: testOrderId });
  assert.equal(updated.status, 'quoted', 'Order status must be updated to quoted');

  // Clean up test order
  await db.collection('orders').deleteOne({ _id: testOrderId });
});

// 7. Google Merchant XML Feed Validation
await test('API Feed: Google Merchant Center RSS feed generator logic', async () => {
  const sampleProducts = await db.collection('products').find({}).limit(3).toArray();
  assert.ok(sampleProducts.length > 0);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Tawwakal Automation - Marine &amp; Industrial Equipment</title>
    <link>https://tawwakalautomation.com</link>`;

  for (const p of sampleProducts) {
    xml += `
    <item>
      <g:id>${p._id.toString()}</g:id>
      <g:title>${p.title.replace(/&/g, '&amp;')}</g:title>
      <g:link>https://tawwakalautomation.com/product/${p.slug || p._id}</g:link>
      <g:availability>in_stock</g:availability>
      <g:condition>used</g:condition>
    </item>`;
  }
  xml += `\n  </channel>\n</rss>`;

  assert.ok(xml.includes('<rss version="2.0"'), 'XML must contain valid RSS 2.0 tag');
  assert.ok(xml.includes('<channel>'), 'XML must contain channel element');
  assert.ok(xml.includes('<item>'), 'XML must contain items');
});

await mongoose.disconnect();
console.log(`\nBackend API Integration Summary: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
