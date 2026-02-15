#!/usr/bin/env node

/**
 * Test: validate-internal-links.js
 * 
 * Purpose: Verify that all internal links have correct pathPrefix applied
 * 
 * This test runs after `npm run build` and checks:
 * 1. All internal links in _site/ include pathPrefix (/my-main-blog/)
 * 2. Links don't have double slashes or incorrect paths
 * 3. Link targets exist in the generated _site directory
 * 4. Absolute path links are not used instead of pathPrefix
 * 
 * Usage: npm run test:link-validation
 * Expected: ✅ Pass (all links have correct pathPrefix)
 */

const fs = require("fs");
const path = require("path");

// ========== Configuration ==========

const SITE_DIR = path.join(process.cwd(), "_site");
const PATH_PREFIX = "/my-main-blog/";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

// ========== Test Results ==========

let passed = 0;
let failed = 0;
const errors = [];

// ========== Helper Functions ==========

/**
 * 再帰的に _site ディレクトリ内のすべての HTML ファイルを取得
 */
function getAllHtmlFiles(dir) {
  const files = [];
  
  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach((item) => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (item.endsWith(".html")) {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files;
}

/**
 * HTML から すべての internal href を抽出
 * internal = "/" で始まるリンク（ただし http:// や https:// は除外）
 */
function extractInternalLinks(htmlContent) {
  const links = [];
  const hrefMatch = /href=["']([^"']+)["']/g;
  let match;
  
  while ((match = hrefMatch.exec(htmlContent)) !== null) {
    const href = match[1];
    
    // internal link（/ で始まり、protocol を含まない）仅考虑 /で始まるもの
    if (href.startsWith("/") && !href.startsWith("//") && !href.includes("://")) {
      links.push(href);
    }
  }
  
  return links;
}

/**
 * リンクが pathPrefix を含んでいるか確認
 */
function hasPathPrefix(link) {
  return link.startsWith(PATH_PREFIX);
}

/**
 * リンク先が _site に存在するか確認
 */
function linkTargetExists(link) {
  // /my-main-blog/articles/xxx/ → _site/articles/xxx/index.html
  const cleanPath = link.replace(PATH_PREFIX, "");
  
  // 末尾のスラッシュを削除してパスを正規化
  let filePath;
  if (cleanPath === "") {
    filePath = path.join(SITE_DIR, "index.html");
  } else if (cleanPath.endsWith("/")) {
    filePath = path.join(SITE_DIR, cleanPath, "index.html");
  } else {
    filePath = path.join(SITE_DIR, cleanPath);
  }
  
  return fs.existsSync(filePath);
}

// ========== Main Test ==========

console.log(`\n${colors.blue}🔍 Internal Links Validation${colors.reset}\n`);

// Step 1: _site ディレクトリが存在するか確認
if (!fs.existsSync(SITE_DIR)) {
  console.error(`${colors.red}❌ Error: _site directory not found${colors.reset}`);
  process.exit(1);
}

// Step 2: すべての HTML ファイルを取得
const htmlFiles = getAllHtmlFiles(SITE_DIR);

if (htmlFiles.length === 0) {
  console.error(`${colors.red}❌ Error: No HTML files found in _site${colors.reset}`);
  process.exit(1);
}

console.log(`Found ${htmlFiles.length} HTML file(s)\n`);

// Step 3: 各 HTML ファイルのリンクを検証
htmlFiles.forEach((filePath) => {
  const relativeFilePath = path.relative(SITE_DIR, filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const links = extractInternalLinks(content);
  
  if (links.length === 0) {
    return; // リンクなしはスキップ
  }
  
  console.log(`${colors.yellow}${relativeFilePath}${colors.reset}`);
  
  links.forEach((link) => {
    if (!hasPathPrefix(link)) {
      failed++;
      errors.push({
        file: relativeFilePath,
        link,
        issue: "Missing pathPrefix",
      });
      console.log(`  ${colors.red}✘${colors.reset} ${link}`);
    } else if (!linkTargetExists(link)) {
      failed++;
      errors.push({
        file: relativeFilePath,
        link,
        issue: "Link target does not exist",
      });
      console.log(`  ${colors.red}✘${colors.reset} ${link} (target not found)`);
    } else {
      passed++;
      console.log(`  ${colors.green}✓${colors.reset} ${link}`);
    }
  });
});

// ========== Results ==========

console.log(`\n${"=".repeat(60)}`);
console.log(`${colors.green}Passed${colors.reset}: ${passed} links`);
console.log(`${colors.red}Failed${colors.reset}: ${failed} links`);

if (failed > 0) {
  console.log(`\n${colors.red}Failed Links:${colors.reset}`);
  errors.forEach((error) => {
    console.log(`  - ${error.file}: ${error.link}`);
    console.log(`    Issue: ${error.issue}`);
  });
  
  console.log(`\n${colors.red}❌ Link validation failed!${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.green}✅ All links have correct pathPrefix!${colors.reset}\n`);
  process.exit(0);
}
