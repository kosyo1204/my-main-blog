/**
 * Purpose: 記事ページのHTML構造とCSS参照を検証
 * - DOCTYPE宣言の存在
 * - CSS linkタグの存在
 * - Front Matterの混入がないこと
 *
 * Usage: node scripts/validate-article-html.js
 *
 * Expected:
 * - すべての記事ページが適切なHTML構造を持つ
 * - CSSファイルが正しく参照されている
 * - Front MatterがHTML出力に含まれていない
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE_DIR = path.join(__dirname, '..', '_site');
const ARTICLES_DIR = path.join(SITE_DIR, 'articles');

let hasErrors = false;
let validatedCount = 0;

/**
 * 記事ページのHTML構造を検証
 */
function validateArticlePage(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const errors = [];

  // 1. DOCTYPE宣言の確認
  if (!content.trimStart().startsWith('<!DOCTYPE html>')) {
    errors.push('DOCTYPE宣言が見つかりません');
  }

  // 2. Front Matterの混入確認（YAML形式）- DOMパース前にチェック
  const lines = content.split('\n');
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    if (lines[i].trim() === '---' && i < 5) {
      // 先頭付近に --- が見つかった場合、Front Matterの可能性
      if (i === 0 || (i > 0 && lines[i-1].trim() === '')) {
        errors.push(`Front Matterの混入の可能性（${i+1}行目に '---' が見つかりました）`);
      }
    }
  }

  // 3. DOMパースによる構造検証
  try {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    // HTML基本構造の確認
    const html = document.querySelector('html');
    const head = document.querySelector('head');
    const body = document.querySelector('body');

    if (!html) {
      errors.push('<html>要素が見つかりません');
    }
    if (!head) {
      errors.push('<head>要素が見つかりません');
    }
    if (!body) {
      errors.push('<body>要素が見つかりません');
    }

    // メタタグの確認
    const charsetMeta = document.querySelector('meta[charset]');
    if (!charsetMeta) {
      errors.push('charset meta タグが見つかりません');
    } else if (charsetMeta.getAttribute('charset').toUpperCase() !== 'UTF-8') {
      errors.push('charset が UTF-8 ではありません');
    }

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      errors.push('viewport meta タグが見つかりません');
    }

    // CSS linkタグの確認
    const stylesheetLinks = document.querySelectorAll('link[rel="stylesheet"]');
    if (stylesheetLinks.length === 0) {
      errors.push('CSS linkタグが見つかりません');
    }

    // site.cssへの参照確認
    const siteCssLink = Array.from(stylesheetLinks).find(link => {
      const href = link.getAttribute('href');
      return href && href.includes('/my-main-blog/css/site.css');
    });
    if (!siteCssLink) {
      errors.push('site.cssへの参照が見つかりません');
    }

  } catch (parseError) {
    errors.push(`HTMLパースエラー: ${parseError.message}`);
  }

  if (errors.length > 0) {
    console.error(`\n❌ ${relativePath}:`);
    errors.forEach(error => console.error(`   - ${error}`));
    hasErrors = true;
  } else {
    console.log(`✓ ${relativePath}`);
  }

  validatedCount++;
}

/**
 * 記事ディレクトリを再帰的にスキャン
 */
function scanArticlePages(dir, baseDir = dir) {
  if (!fs.existsSync(dir)) {
    console.error('❌ 記事ディレクトリが見つかりません:', dir);
    console.error('   ビルド設定を確認してください。');
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanArticlePages(fullPath, baseDir);
    } else if (entry.name === 'index.html') {
      const relativePath = path.relative(SITE_DIR, fullPath);
      validateArticlePage(fullPath, relativePath);
    }
  }
}

// メイン処理
console.log('📝 記事ページのHTML構造を検証中...\n');

if (!fs.existsSync(SITE_DIR)) {
  console.error('❌ _site ディレクトリが見つかりません。先に `npm run build` を実行してください。');
  process.exit(1);
}

scanArticlePages(ARTICLES_DIR);

// 検証結果の確認
if (validatedCount === 0) {
  console.error('\n❌ 検証対象の記事が見つかりませんでした');
  console.error('   記事ページ (index.html) が _site/articles/ 配下に生成されているか確認してください。');
  process.exit(1);
}

if (hasErrors) {
  console.error('\n❌ 検証エラーが見つかりました');
  process.exit(1);
} else {
  console.log(`\n✅ すべての記事ページが正しいHTML構造を持っています (${validatedCount}件の記事を検証)`);
}
