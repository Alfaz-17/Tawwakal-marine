import { spawn } from 'node:child_process';
import path from 'node:path';

const suites = [
  { name: 'Unit Tests (Cache, Auth, SEO & Schemas)', file: 'tests/unit.test.mjs' },
  { name: 'Backend API Integration Tests (MongoDB, Products, Categories, RFQs)', file: 'tests/api-integration.test.mjs' },
  { name: 'Full-Stack E2E Workflow Tests (Customer Flow, Admin Panel, Lifecycle)', file: 'tests/e2e-workflow.test.mjs' },
];

console.log('\n===============================================================');
console.log('🚀 TAWWAKAL AUTOMATION - COMPREHENSIVE PRODUCTION TEST SUITE');
console.log('===============================================================\n');

const startTime = Date.now();
let totalPassed = 0;
let totalFailed = 0;

async function runSuite(suite) {
  return new Promise((resolve) => {
    console.log(`▶ Starting Suite: ${suite.name}...`);
    const child = spawn('node', [suite.file], {
      stdio: 'inherit',
      shell: true,
      env: process.env
    });

    child.on('close', (code) => {
      if (code === 0) {
        totalPassed++;
        console.log(`\n✔ Suite Completed: ${suite.name} [PASSED]\n`);
      } else {
        totalFailed++;
        console.error(`\n✖ Suite Completed: ${suite.name} [FAILED with exit code ${code}]\n`);
      }
      resolve(code === 0);
    });
  });
}

for (const suite of suites) {
  await runSuite(suite);
}

const duration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log('===============================================================');
console.log('📊 FINAL TEST SUITE RESULTS REPORT');
console.log('===============================================================');
console.log(`Total Test Suites Run : ${suites.length}`);
console.log(`Suites Passed         : ${totalPassed} ✔`);
console.log(`Suites Failed         : ${totalFailed} ${totalFailed > 0 ? '✖' : ''}`);
console.log(`Total Execution Time  : ${duration}s`);
console.log('===============================================================');

if (totalFailed === 0) {
  console.log('🎉 ALL TESTS PASSED! WEBSITE IS 100% PRODUCTION READY FOR LAUNCH!');
  process.exit(0);
} else {
  console.error('❌ SOME TESTS FAILED. PLEASE REVIEW THE LOGS ABOVE.');
  process.exit(1);
}
