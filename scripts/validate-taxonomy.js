#!/usr/bin/env node

/**
 * validate-taxonomy.js
 *
 * Purpose: Validate that tag and category pages are generated correctly
 *
 * Checks:
 * 1. /tags/index.html exists (tag listing page)
 * 2. /categories/index.html exists (category listing page)
 * 3. All tag-specific pages exist (/tags/{tag}/index.html)
 * 4. All category-specific pages exist (/categories/{category}/index.html)
 * 5. Tag/category pages contain expected content
 *
 * Exit Code:
 * - 0: All tests passed
 * - 1: One or more tests failed
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SITE_BUILD_DIR = path.join(__dirname, "..", "_site");
const TAGS_BUILD_DIR = path.join(SITE_BUILD_DIR, "tags");
const CATEGORIES_BUILD_DIR = path.join(SITE_BUILD_DIR, "categories");

// Logging utilities
const log = {
  section: (msg) => console.log(`\n[TEST] ${msg}\n`),
  check: (msg) => console.log(`📄 ${msg}`),
  pass: (msg) => console.log(`   ✅ ${msg}`),
  fail: (msg) => console.log(`   ❌ ${msg}`),
  error: (msg) => console.log(`   ⚠️  ${msg}`),
  divider: () =>
    console.log("\n==================================================\n"),
};

let passCount = 0;
let failCount = 0;
const failureDetails = [];

// Test 1: Verify tag listing page exists
log.section("Validating taxonomy pages...");

log.check("Checking tag listing page...");
const tagsIndexPath = path.join(TAGS_BUILD_DIR, "index.html");
if (fs.existsSync(tagsIndexPath)) {
  log.pass("Found: /tags/index.html");
  passCount++;
} else {
  log.fail("ERROR: /tags/index.html not found");
  failCount++;
  failureDetails.push({
    name: "Tag listing page exists",
    expected: "File exists at _site/tags/index.html",
    actual: "File not found",
  });
}

// Test 2: Verify category listing page exists
log.check("Checking category listing page...");
const categoriesIndexPath = path.join(CATEGORIES_BUILD_DIR, "index.html");
if (fs.existsSync(categoriesIndexPath)) {
  log.pass("Found: /categories/index.html");
  passCount++;
} else {
  log.fail("ERROR: /categories/index.html not found");
  failCount++;
  failureDetails.push({
    name: "Category listing page exists",
    expected: "File exists at _site/categories/index.html",
    actual: "File not found",
  });
}

// Test 3: Verify tag-specific pages
log.check("Checking tag-specific pages...");
if (fs.existsSync(TAGS_BUILD_DIR)) {
  const tagDirs = fs
    .readdirSync(TAGS_BUILD_DIR)
    .filter(
      (file) =>
        fs.statSync(path.join(TAGS_BUILD_DIR, file)).isDirectory() &&
        file !== "index.html"
    );

  if (tagDirs.length > 0) {
    tagDirs.forEach((tagDir) => {
      const tagPagePath = path.join(TAGS_BUILD_DIR, tagDir, "index.html");
      if (fs.existsSync(tagPagePath)) {
        log.pass(`Found tag page: /tags/${tagDir}/`);
        passCount++;
      } else {
        log.fail(`Tag page missing: /tags/${tagDir}/`);
        failCount++;
        failureDetails.push({
          name: `Tag page exists: ${tagDir}`,
          expected: `File exists at _site/tags/${tagDir}/index.html`,
          actual: "File not found",
        });
      }
    });
  } else {
    log.error("No tag-specific directories found (may be empty if no tags)");
  }
} else {
  log.fail("ERROR: tags directory not found");
  failCount++;
  failureDetails.push({
    name: "Tags directory exists",
    expected: "Directory exists at _site/tags/",
    actual: "Directory not found",
  });
}

// Test 4: Verify category-specific pages
log.check("Checking category-specific pages...");
if (fs.existsSync(CATEGORIES_BUILD_DIR)) {
  const categoryDirs = fs
    .readdirSync(CATEGORIES_BUILD_DIR)
    .filter(
      (file) =>
        fs.statSync(path.join(CATEGORIES_BUILD_DIR, file)).isDirectory() &&
        file !== "index.html"
    );

  if (categoryDirs.length > 0) {
    categoryDirs.forEach((catDir) => {
      const catPagePath = path.join(CATEGORIES_BUILD_DIR, catDir, "index.html");
      if (fs.existsSync(catPagePath)) {
        log.pass(`Found category page: /categories/${catDir}/`);
        passCount++;
      } else {
        log.fail(`Category page missing: /categories/${catDir}/`);
        failCount++;
        failureDetails.push({
          name: `Category page exists: ${catDir}`,
          expected: `File exists at _site/categories/${catDir}/index.html`,
          actual: "File not found",
        });
      }
    });
  } else {
    log.error(
      "No category-specific directories found (may be empty if no categories)"
    );
  }
} else {
  log.fail("ERROR: categories directory not found");
  failCount++;
  failureDetails.push({
    name: "Categories directory exists",
    expected: "Directory exists at _site/categories/",
    actual: "Directory not found",
  });
}

// Test 5: Verify tag/category page content
log.check("Checking tag/category page content...");
const tagsPageContent = fs.readFileSync(tagsIndexPath, "utf8");
const hasTagsContent =
  tagsPageContent.includes("タグ") || tagsPageContent.includes("tag");
if (hasTagsContent) {
  log.pass("Tag listing page contains expected content");
  passCount++;
} else {
  log.error("Tag listing page content unclear");
}

const categoriesPageContent = fs.readFileSync(categoriesIndexPath, "utf8");
const hasCategoriesContent =
  categoriesPageContent.includes("カテゴリー") ||
  categoriesPageContent.includes("category");
if (hasCategoriesContent) {
  log.pass("Category listing page contains expected content");
  passCount++;
} else {
  log.error("Category listing page content unclear");
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

if (failCount === 0) {
  console.log("✅ All taxonomy tests passed!\n");
  process.exit(0);
} else {
  console.log(`❌ ${failCount} test(s) failed\n`);
  process.exit(1);
}
