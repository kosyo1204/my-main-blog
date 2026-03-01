#!/usr/bin/env node

/**
 * Test: validate-article-css.js
 *
 * Purpose: 記事ページで base レイアウトが適用され、CSS が正しく読み込まれることを検証する
 *
 * This test runs after `npm run build` and checks:
 * 1. _site/articles 配下の各記事 index.html が生成されている
 * 2. 各記事ページに <link rel="stylesheet" href="/my-main-blog/css/site.css"> が含まれる
 * 3. Front Matter の生文字列（--- / layout: base）が本文に混入していない
 *
 * Usage: npm run test:article-css
 * Expected: ✅ Pass (all article pages load CSS via base layout)
 */

const fs = require("fs");
const path = require("path");

const SITE_DIR = path.join(process.cwd(), "_site");
const ARTICLES_DIR = path.join(SITE_DIR, "articles");
const REQUIRED_STYLESHEET_HREF = "/my-main-blog/css/site.css";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

let passed = 0;
let failed = 0;

/**
 * 記事ディレクトリ配下の index.html 一覧を再帰的に取得する
 */
function getArticleHtmlFiles(directoryPath) {
  const htmlFiles = [];

  function walk(currentDirectory) {
    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (entry.isFile() && entry.name === "index.html") {
        htmlFiles.push(entryPath);
      }
    }
  }

  walk(directoryPath);
  return htmlFiles;
}

/**
 * 単一記事ページの検証を行う
 */
function validateArticlePage(filePath) {
  const html = fs.readFileSync(filePath, "utf-8");
  const relativePath = path.relative(SITE_DIR, filePath);

  const hasStylesheetLink = new RegExp(
    `<link\\s+rel=["']stylesheet["']\\s+href=["']${REQUIRED_STYLESHEET_HREF}["']`,
    "i"
  ).test(html);

  const hasFrontMatterArtifact = /^\s*---\s*\r?\n\s*layout:\s*base\s*\r?\n\s*---/i.test(html);

  if (!hasStylesheetLink) {
    failed++;
    console.log(
      `${colors.red}✘${colors.reset} ${relativePath} : stylesheet link missing (${REQUIRED_STYLESHEET_HREF})`
    );
  } else {
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${relativePath} : stylesheet link found`);
  }

  if (hasFrontMatterArtifact) {
    failed++;
    console.log(`${colors.red}✘${colors.reset} ${relativePath} : front matter artifact detected`);
  } else {
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${relativePath} : no front matter artifact`);
  }
}

function main() {
  console.log(`\n${colors.blue}🔍 Article CSS Loading Validation${colors.reset}\n`);

  // _site が未生成なら、ビルド漏れとして即失敗
  if (!fs.existsSync(SITE_DIR)) {
    console.error(`${colors.red}❌ Error: _site directory not found${colors.reset}`);
    process.exit(1);
  }

  // 記事ディレクトリがなければ、記事生成の失敗として扱う
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error(`${colors.red}❌ Error: _site/articles directory not found${colors.reset}`);
    process.exit(1);
  }

  const articleFiles = getArticleHtmlFiles(ARTICLES_DIR);

  if (articleFiles.length === 0) {
    console.error(`${colors.red}❌ Error: No article index.html files found${colors.reset}`);
    process.exit(1);
  }

  console.log(`Found ${articleFiles.length} article page(s)\n`);

  for (const filePath of articleFiles) {
    validateArticlePage(filePath);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`${colors.green}Passed${colors.reset}: ${passed}`);
  console.log(`${colors.red}Failed${colors.reset}: ${failed}`);

  if (failed > 0) {
    console.log(`\n${colors.red}❌ Article CSS loading validation failed!${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`\n${colors.green}✅ All article pages correctly load CSS!${colors.reset}\n`);
}

main();
