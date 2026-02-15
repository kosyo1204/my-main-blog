#!/usr/bin/env node

/**
 * Test: validate-published.js
 * 
 * Purpose: Verify that unpublished articles (published: false) are excluded from build output
 * 
 * This test runs after `npm run build` and checks:
 * 1. No unpublished article HTML files are generated in _site/
 * 2. Unpublished articles have no corresponding index.html
 * 3. Build succeeds without errors
 * 
 * Usage: npm run test:published
 * Expected: ✅ Pass (all unpublished articles excluded)
 */

const fs = require("fs");
const path = require("path");

// ========== Configuration ==========

const SITE_DIR = path.join(process.cwd(), "_site");
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const ARTICLES_BUILD_DIR = path.join(SITE_DIR, "articles");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

// ========== Helper Functions ==========

/**
 * Parse frontmatter from markdown file
 * Returns { frontmatter: object, published: boolean }
 */
function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!match) {
      return { frontmatter: {}, published: true }; // Default to published if no frontmatter
    }

    const fm = match[1];
    const published = /published:\s*true/.test(fm);
    
    return { frontmatter: fm, published };
  } catch (error) {
    console.error(`  ❌ Error parsing ${filePath}:`, error.message);
    return { frontmatter: {}, published: true };
  }
}

/**
 * Get article slug from filename
 * Example: "2026-02-14-sample-post.md" → "2026-02-14-sample-post"
 */
function getArticleSlug(filename) {
  return filename.replace(/\.md$/, "");
}

/**
 * Check if article HTML exists in build output
 */
function articleExistsInBuild(slug) {
  const articleHtmlPath = path.join(ARTICLES_BUILD_DIR, slug, "index.html");
  return fs.existsSync(articleHtmlPath);
}

// ========== Main Test Logic ==========

console.log(`\n${colors.blue}[TEST] Validating published filter...${colors.reset}\n`);

let passed = 0;
let failed = 0;
const failures = [];

// Check if articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  console.log(`${colors.yellow}⚠️  No articles directory found${colors.reset}`);
  console.log(`   Expected: ${ARTICLES_DIR}`);
  process.exit(0); // Not an error if no articles yet
}

// Read all article files
const articleFiles = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

if (articleFiles.length === 0) {
  console.log(`${colors.yellow}⚠️  No article files found in ${ARTICLES_DIR}${colors.reset}`);
  process.exit(0);
}

console.log(`📄 Found ${articleFiles.length} article file(s)\n`);

// Test each article
articleFiles.forEach((file) => {
  const filePath = path.join(ARTICLES_DIR, file);
  const slug = getArticleSlug(file);
  const { published } = parseFrontmatter(filePath);

  const builtExists = articleExistsInBuild(slug);
  const icon = builtExists ? "✅" : "❌";

  if (published) {
    // Published articles SHOULD be in build
    if (builtExists) {
      console.log(`${icon} ${colors.green}[PUBLISHED]${colors.reset} ${file} → built`);
      passed++;
    } else {
      console.log(`${icon} ${colors.red}[PUBLISHED]${colors.reset} ${file} → NOT built (ERROR)`);
      failures.push({
        file,
        expected: "published in _site/",
        actual: "not found in _site/",
      });
      failed++;
    }
  } else {
    // Unpublished articles should NOT be in build
    if (!builtExists) {
      console.log(`${icon} ${colors.green}[UNPUBLISHED]${colors.reset} ${file} → excluded ✓`);
      passed++;
    } else {
      console.log(`${icon} ${colors.red}[UNPUBLISHED]${colors.reset} ${file} → BUILT (ERROR)`);
      failures.push({
        file,
        expected: "excluded from _site/",
        actual: "found in _site/articles/" + slug,
      });
      failed++;
    }
  }
});

// ========== Report Results ==========

console.log(`\n${Array(50).fill("=").join("")}`);
console.log(`\n📊 Test Results:`);
console.log(`   ${colors.green}✅ Passed: ${passed}${colors.reset}`);
console.log(`   ${colors.red}❌ Failed: ${failed}${colors.reset}`);

if (failures.length > 0) {
  console.log(`\n${colors.red}Failures:${colors.reset}`);
  failures.forEach((f) => {
    console.log(`   • ${f.file}`);
    console.log(`     Expected: ${f.expected}`);
    console.log(`     Actual:   ${f.actual}`);
  });
}

console.log(`\n${Array(50).fill("=").join("")}\n`);

// Exit with failure code if any test failed
if (failed > 0) {
  process.exit(1);
}

console.log(`${colors.green}✅ All tests passed!${colors.reset}\n`);
process.exit(0);
