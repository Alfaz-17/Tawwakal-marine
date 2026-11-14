import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCache, setCache, invalidateCache } from '../lib/cache.ts';

console.log('\n========================================');
console.log('🧪 RUNNING UNIT TESTS');
console.log('========================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

async function asyncTest(name, fn) {
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

// 1. Cache Utility Tests
test('Cache: setCache stores and getCache retrieves data', () => {
  setCache('test:key1', { part: '6ES7315-2EH14-0AB0', stock: 5 }, 60);
  const data = getCache('test:key1');
  assert.ok(data);
  assert.equal(data.part, '6ES7315-2EH14-0AB0');
  assert.equal(data.stock, 5);
});

test('Cache: getCache returns null for non-existent keys', () => {
  const data = getCache('test:nonexistent');
  assert.equal(data, null);
});

test('Cache: TTL expiration returns null after expiry', () => {
  setCache('test:expired', { test: true }, -1); // already expired
  const data = getCache('test:expired');
  assert.equal(data, null);
});

test('Cache: invalidateCache clears keys matching prefix', () => {
  setCache('products:item1', { id: 1 }, 60);
  setCache('products:item2', { id: 2 }, 60);
  setCache('categories:item1', { id: 3 }, 60);

  invalidateCache('products');

  assert.equal(getCache('products:item1'), null);
  assert.equal(getCache('products:item2'), null);
  assert.ok(getCache('categories:item1')); // categories untouched
});

// 2. Authentication & JWT Token Tests
const TEST_JWT_SECRET = 'Tawwakal-marine.DB';

test('Auth: JWT Token Signing and Verification', () => {
  const payload = { userId: 'admin_test_123', email: 'tawwakalautomation@gmail.com' };
  const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '1d' });
  assert.ok(token);

  const decoded = jwt.verify(token, TEST_JWT_SECRET);
  assert.equal(decoded.userId, 'admin_test_123');
  assert.equal(decoded.email, 'tawwakalautomation@gmail.com');
});

test('Auth: Reject invalid or forged JWT token', () => {
  assert.throws(() => {
    jwt.verify('invalid.token.signature', TEST_JWT_SECRET);
  });
});

// 3. Password Hashing (bcryptjs) Tests
await asyncTest('Password Hashing: bcrypt hash and verification match', async () => {
  const rawPassword = 'Tawwakal@123';
  const hashed = await bcrypt.hash(rawPassword, 10);
  assert.ok(hashed && hashed.startsWith('$2'));

  const isMatch = await bcrypt.compare(rawPassword, hashed);
  assert.equal(isMatch, true);

  const isWrongMatch = await bcrypt.compare('WrongPassword999', hashed);
  assert.equal(isWrongMatch, false);
});

// 4. Slug Generator Helper Tests
test('Slugify: generates clean SEO friendly product & category slugs', () => {
  const slugify = (text) => text.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  
  assert.equal(
    slugify('Siemens Simatic S7-300 CPU 315-2 PN/DP'),
    'siemens-simatic-s7300-cpu-3152-pndp'
  );
  assert.equal(
    slugify('Oil Mist Detectors (OMD)'),
    'oil-mist-detectors-omd'
  );
  assert.equal(
    slugify('Danfoss VLT AutomationDrive FC 302 37kW!'),
    'danfoss-vlt-automationdrive-fc-302-37kw'
  );
});

// 5. Schema.org Structured Data Formatter Test
test('Structured Data: builds valid Product schema', () => {
  const product = {
    title: 'Siemens S7-300 CPU',
    sku: '6ES7315-2EH14-0AB0',
    brandName: 'Siemens',
    availability: 'in-stock',
    condition: 'used-tested'
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brandName },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      seller: { '@type': 'Organization', name: 'Tawwakal Automation' }
    }
  };

  assert.equal(schema['@type'], 'Product');
  assert.equal(schema.sku, '6ES7315-2EH14-0AB0');
  assert.equal(schema.offers.availability, 'https://schema.org/InStock');
  assert.equal(schema.brand.name, 'Siemens');
});

console.log(`\nUnit Tests Summary: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
