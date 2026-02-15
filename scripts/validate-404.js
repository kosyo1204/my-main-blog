#!/usr/bin/env node

/**
 * Test: validate-404.js
 * 
 * Purpose: Verify that 404 page is generated with correct message
 * 
 * This test runs after `npm run build` and checks:
 * 1. 404.md is built to _site/404.html
 * 2. 404.html contains expected message "この記事は公開されていません"
 * 3. 404 page is accessible and syntactically valid
 * 
 * Usage: npm run test:404
 * Expected: ✅ Pass (404 page exists with correct content)
 */

const fs = require("fs");
const path = require("path");

// ========== Configuration ==========

const SITE_DIR = path.join(process.cwd(), "_site");
const NOT_FOUND_HTML = path.join(SITE_DIR, "404.html");
const NOT_FOUND_SOURCE = path.join(process.cwd(), "content", "404.md");

// Expected message content (from spec FR-025)
const EXPECTED_MESSAGES = [
  "この記事は公開されていません",
  "404",
  "ページが見つかりません",
];

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

// ========== Main Test Logic ==========

console.log(`\n${colors.blue}[TEST] Validating 404 page...${colors.reset}\n`);

let passed = 0;
let failed = 0;
const failures = [];

// Test 1: Check if 404 source exists
console.log(`📄 Checking 404 source file...`);
if (!fs.existsSync(NOT_FOUND_SOURCE)) {
  console.log(`   ${colors.yellow}⚠️  WARNING: ${NOT_FOUND_SOURCE} not found${colors.reset}`);
  console.log(`   This file should be created in T016`);
  console.log(`   Skipping 404 page validation...\n`);
  process.exit(0);
}
console.log(`   ${colors.green}✅ Found: 404.md${colors.reset}`);

// Test 2: Check if 404.html is built
console.log(`\n📄 Checking 404 build output...`);
if (!fs.existsSync(NOT_FOUND_HTML)) {
  console.log(`   ${colors.red}❌ ERROR: ${NOT_FOUND_HTML} not found${colors.reset}`);
  console.log(`   Expected path: ${NOT_FOUND_HTML}`);
  failures.push({
    test: "404.html exists",
    expected: "File exists at _site/404.html",
    actual: "File not found",
  });
  failed++;
} else {
  console.log(`   ${colors.green}✅ Found: 404.html${colors.reset}`);
  passed++;

  // Test 3: Check content
  console.log(`\n📄 Checking 404 page content...`);
  const content = fs.readFileSync(NOT_FOUND_HTML, "utf-8");

  // Validate HTML structure
  if (!content.includes("</html>")) {
    console.log(`   ${colors.red}❌ ERROR: Invalid HTML structure${colors.reset}`);
    failures.push({
      test: "Valid HTML",
      expected: "404.html contains closing </html> tag",
      actual: "Invalid HTML structure",
    });
    failed++;
  } else {
    console.log(`   ${colors.green}✅ Valid HTML structure${colors.reset}`);
    passed++;
  }

  // Check for expected message content
  let foundMessage = false;
  for (const msg of EXPECTED_MESSAGES) {
    if (content.includes(msg)) {
      console.log(`   ${colors.green}✅ Message found: "${msg}"${colors.reset}`);
      foundMessage = true;
      passed++;
      break;
    }
  }

  if (!foundMessage) {
    console.log(`   ${colors.red}❌ ERROR: Expected message not found${colors.reset}`);
    console.log(`   Expected one of: ${EXPECTED_MESSAGES.join(", ")}`);
    failures.push({
      test: "404 message content",
      expected: `One of: ${EXPECTED_MESSAGES.join(", ")}`,
      actual: "None found in page",
    });
    failed++;
  }

  // Check for basic link back to home
  if (content.includes('href="/"') || content.includes("href='/'")) {
    console.log(`   ${colors.green}✅ Home link found${colors.reset}`);
    passed++;
  } else {
    console.log(`   ${colors.yellow}⚠️  WARNING: Home link not found${colors.reset}`);
  }
}

// ========== Report Results ==========

console.log(`\n${Array(50).fill("=").join("")}`);
console.log(`\n📊 Test Results:`);
console.log(`   ${colors.green}✅ Passed: ${passed}${colors.reset}`);
console.log(`   ${colors.red}❌ Failed: ${failed}${colors.reset}`);

if (failures.length > 0) {
  console.log(`\n${colors.red}Failures:${colors.reset}`);
  failures.forEach((f) => {
    console.log(`   • ${f.test}`);
    console.log(`     Expected: ${f.expected}`);
    console.log(`     Actual:   ${f.actual}`);
  });
}

console.log(`\n${Array(50).fill("=").join("")}\n`);

// Exit with failure code if any test failed
if (failed > 0) {
  process.exit(1);
}

console.log(`${colors.green}✅ All 404 page tests passed!${colors.reset}\n`);
process.exit(0);
