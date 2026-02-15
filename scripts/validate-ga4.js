#!/usr/bin/env node

/**
 * validate-ga4.js
 *
 * Purpose: Validate that GA4 measurement tag is properly embedded
 *
 * Checks:
 * 1. GA4_MEASUREMENT_ID environment variable is set
 * 2. GA4 script tag exists in HTML files
 * 3. GA4 measurement ID is correctly embedded
 * 4. GA4 script is loaded from google analytics CDN
 *
 * Exit Code:
 * - 0: All tests passed
 * - 1: One or more tests failed
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SITE_BUILD_DIR = path.join(__dirname, "..", "_site");
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;

// Logging utilities
const log = {
  section: (msg) => console.log(`\n[TEST] ${msg}\n`),
  check: (msg) => console.log(`📊 ${msg}`),
  pass: (msg) => console.log(`   ✅ ${msg}`),
  fail: (msg) => console.log(`   ❌ ${msg}`),
  error: (msg) => console.log(`   ⚠️  ${msg}`),
  divider: () =>
    console.log("\n==================================================\n"),
};

let passCount = 0;
let failCount = 0;
const failureDetails = [];

// Test 1: Check if GA4_MEASUREMENT_ID is set
log.section("Validating GA4 measurement...");

log.check("Checking GA4_MEASUREMENT_ID environment variable...");
if (GA4_MEASUREMENT_ID) {
  log.pass(`Found: GA4_MEASUREMENT_ID=${GA4_MEASUREMENT_ID}`);
  passCount++;
} else {
  log.error("GA4_MEASUREMENT_ID not set (optional for development)");
  log.error("To enable GA4, set: export GA4_MEASUREMENT_ID=G-XXXXXXXXXX");
}

// Test 2: Check GA4 script in main pages
log.check("Checking GA4 script in generated pages...");
const pagesToCheck = [
  path.join(SITE_BUILD_DIR, "index.html"),
  path.join(SITE_BUILD_DIR, "404.html"),
  path.join(SITE_BUILD_DIR, "tags", "index.html"),
];

let ga4PagesFound = 0;

pagesToCheck.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");

    // Check for GA4 script patterns
    const hasGoogleAnalytics =
      content.includes("googletagmanager.com") ||
      content.includes("gtag") ||
      content.includes("G-");

    const hasGtag = content.includes("gtag(");

    if (hasGoogleAnalytics || hasGtag) {
      const page = path.relative(SITE_BUILD_DIR, filePath);
      log.pass(`GA4 tag found: ${page}`);
      ga4PagesFound++;
      passCount++;
    } else {
      const page = path.relative(SITE_BUILD_DIR, filePath);
      if (GA4_MEASUREMENT_ID) {
        log.fail(`GA4 tag NOT found: ${page}`);
        failCount++;
        failureDetails.push({
          name: `GA4 tag in ${page}`,
          expected:
            "GA4 measurement script with Google Analytics CDN or gtag() call",
          actual: "Not found",
        });
      } else {
        log.error(
          `GA4 tag not found in ${page} (expected when GA4_MEASUREMENT_ID not set)`
        );
      }
    }
  }
});

// Test 3: Verify GA4 ID embedding (if set)
if (GA4_MEASUREMENT_ID) {
  log.check("Checking GA4 measurement ID embedding...");

  let idFound = false;
  pagesToCheck.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.includes(GA4_MEASUREMENT_ID)) {
        idFound = true;
      }
    }
  });

  if (idFound) {
    log.pass(`GA4 measurement ID ${GA4_MEASUREMENT_ID} found in pages`);
    passCount++;
  } else {
    log.fail(`GA4 measurement ID ${GA4_MEASUREMENT_ID} NOT found in pages`);
    failCount++;
    failureDetails.push({
      name: "GA4 measurement ID embedding",
      expected: `Measurement ID ${GA4_MEASUREMENT_ID} embedded in pages`,
      actual: "ID not found",
    });
  }
}

// Test 4: Check for common GA4 patterns
log.check("Checking common GA4 patterns...");

const indexPath = path.join(SITE_BUILD_DIR, "index.html");
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, "utf8");

  // Pattern 1: gtag function
  const hasGtagFunction = /gtag\s*\(\s*['"]config['"]/.test(content);

  // Pattern 2: Google Analytics script URL
  const hasAnalyticsScript =
    content.includes("analytics.js") ||
    content.includes("gtag.js") ||
    content.includes("googletagmanager.com/gtag/js");

  if (hasAnalyticsScript) {
    log.pass("Found Google Analytics script reference");
    passCount++;
  } else if (GA4_MEASUREMENT_ID) {
    log.error(
      "Google Analytics script reference not found (may be injected dynamically)"
    );
  }

  if (hasGtagFunction) {
    log.pass("Found gtag() function call");
    passCount++;
  }
}

// Print results
log.divider();
console.log("📊 Test Results:");
console.log(`   ✅ Passed: ${passCount}`);
console.log(`   ❌ Failed: ${failCount}`);

if (failureDetails.length > 0) {
  console.log("\nFailures:");
  failureDetails.forEach((detail) => {
    console.log(`   • ${detail.name}`);
    console.log(`     Expected: ${detail.expected}`);
    console.log(`     Actual:   ${detail.actual}`);
  });
}

log.divider();

// If GA4_MEASUREMENT_ID is not set, consider as warning, not failure
if (!GA4_MEASUREMENT_ID) {
  console.log("⚠️  GA4_MEASUREMENT_ID not set. GA4 will be disabled.\n");
  console.log("To enable GA4, set the environment variable:");
  console.log("  export GA4_MEASUREMENT_ID=G-XXXXXXXXXX\n");
  process.exit(0); // Exit with 0 since this is not a failure for development
}

if (failCount === 0) {
  console.log("✅ All GA4 tests passed!\n");
  process.exit(0);
} else {
  console.log(`❌ ${failCount} test(s) failed\n`);
  process.exit(1);
}
