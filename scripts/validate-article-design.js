/**
 * validate-article-design.js
 *
 * Purpose: 記事ページのデザイン改善が正しく実装されているかを検証
 *
 * Usage: npm run test:article-design
 *
 * Expected:
 * - CSSファイルに記事コンテンツのスタイルが存在する
 * - JavaScriptファイルが存在する
 * - 記事テンプレートにカテゴリーが含まれる
 * - すべてのデザイン要件が満たされている
 */

const fs = require('fs');
const path = require('path');

const SITE_CSS_PATH = path.join(__dirname, '../static/css/site.css');
const CODE_COPY_JS_PATH = path.join(__dirname, '../static/js/code-copy.js');
const ARTICLE_TEMPLATE_PATH = path.join(__dirname, '../content/_includes/layouts/article.njk');
const BASE_TEMPLATE_PATH = path.join(__dirname, '../content/_includes/layouts/base.njk');

let exitCode = 0;

function error(message) {
  console.error(`❌ ${message}`);
  exitCode = 1;
}

function success(message) {
  console.log(`✅ ${message}`);
}

function checkFileExists(filePath, description) {
  if (!fs.existsSync(filePath)) {
    error(`${description} が見つかりません: ${filePath}`);
    return false;
  }
  success(`${description} が存在します`);
  return true;
}

function checkCSSContent(cssContent) {
  const checks = [
    {
      pattern: /\.article-content\s*\{[^}]*max-width:\s*65ch/,
      description: '記事本文の最適な行長（65ch）'
    },
    {
      pattern: /\.article-content\s*>\s*p:first-of-type::first-letter/,
      description: 'ドロップキャップスタイル'
    },
    {
      pattern: /\.article-content\s+h2\s*\{[^}]*border-left.*4px/,
      description: '見出しH2の左ボーダー'
    },
    {
      pattern: /\.article-content\s+h3\s*\{[^}]*color/,
      description: '見出しH3の色設定'
    },
    {
      pattern: /\.article-content\s+blockquote\s*\{[^}]*background/,
      description: '引用ブロックの背景色'
    },
    {
      pattern: /\.article-content\s+blockquote\s*\{[^}]*border-left/,
      description: '引用ブロックの左ボーダー'
    },
    {
      pattern: /\.code-block-wrapper/,
      description: 'コードブロックラッパー'
    },
    {
      pattern: /\.copy-button/,
      description: 'コピーボタンスタイル'
    },
    {
      pattern: /\.copy-button\.copied/,
      description: 'コピーボタンのコピー済み状態'
    },
    {
      pattern: /\.article-content\s+ul\s+li::before/,
      description: 'リストのカスタム記号'
    },
    {
      pattern: /\.article-content\s+table/,
      description: 'テーブルスタイル'
    },
    {
      pattern: /\.article-content\s+th/,
      description: 'テーブルヘッダーのスタイル'
    },
    {
      pattern: /\.article-content\s+tr:hover/,
      description: 'テーブル行のホバー効果'
    },
    {
      pattern: /\.article-content\s+img\s*\{[^}]*border-radius/,
      description: '画像の角丸'
    },
    {
      pattern: /\.article-content\s+img\s*\{[^}]*box-shadow/,
      description: '画像のシャドウ'
    },
    {
      pattern: /\.article-content\s+figure/,
      description: '画像figureスタイル'
    },
    {
      pattern: /\.article-content\s+figcaption/,
      description: '画像キャプションスタイル'
    },
    {
      pattern: /\.article-meta/,
      description: '記事メタ情報のFlexレイアウト'
    },
    {
      pattern: /\.article-meta/,
      description: '記事メタ情報の下ボーダー'
    },
    {
      pattern: /\.article-category/,
      description: 'カテゴリーバッジスタイル'
    },
    {
      pattern: /pre\s*\{[^}]*background-color:\s*#1e1e1e/,
      description: 'コードブロックのダークテーマ'
    },
    {
      pattern: /@media\s*\(prefers-color-scheme:\s*dark\)[\s\S]*\.article-content/,
      description: 'ダークモード対応'
    }
  ];

  checks.forEach(check => {
    if (check.pattern.test(cssContent)) {
      success(`CSS: ${check.description}`);
    } else {
      error(`CSS: ${check.description} が見つかりません`);
    }
  });
}

function checkJavaScriptContent(jsContent) {
  const checks = [
    {
      pattern: /document\.querySelectorAll\(['"]pre['"]\)/,
      description: 'pre要素の検索'
    },
    {
      pattern: /code-block-wrapper/,
      description: 'コードブロックラッパーの作成'
    },
    {
      pattern: /copy-button/,
      description: 'コピーボタンの作成'
    },
    {
      pattern: /navigator\.clipboard\.writeText/,
      description: 'クリップボードAPIの使用'
    },
    {
      pattern: /copied/,
      description: 'コピー済み状態の表示'
    }
  ];

  checks.forEach(check => {
    if (check.pattern.test(jsContent)) {
      success(`JavaScript: ${check.description}`);
    } else {
      error(`JavaScript: ${check.description} が見つかりません`);
    }
  });
}

function checkArticleTemplate(templateContent) {
  const checks = [
    {
      pattern: /article-meta/,
      description: '記事メタ情報セクション'
    },
    {
      pattern: /published-date/,
      description: '公開日の表示'
    },
    {
      pattern: /article-category/,
      description: 'カテゴリーの表示'
    },
    {
      pattern: /{%-?\s*if\s+category\s*%}/,
      description: 'カテゴリー条件分岐'
    }
  ];

  checks.forEach(check => {
    if (check.pattern.test(templateContent)) {
      success(`テンプレート: ${check.description}`);
    } else {
      error(`テンプレート: ${check.description} が見つかりません`);
    }
  });
}

function checkBaseTemplate(templateContent) {
  const checks = [
    {
      pattern: /<script\s+src=[^>]*\/js\/code-copy\.js/,
      description: 'code-copy.jsの読み込み'
    }
  ];

  checks.forEach(check => {
    if (check.pattern.test(templateContent)) {
      success(`ベーステンプレート: ${check.description}`);
    } else {
      error(`ベーステンプレート: ${check.description} が見つかりません`);
    }
  });
}

function main() {
  console.log('🔍 記事ページデザイン改善の検証を開始します...\n');

  // ファイル存在確認
  console.log('📁 ファイル存在確認:');
  const cssExists = checkFileExists(SITE_CSS_PATH, 'CSSファイル');
  const jsExists = checkFileExists(CODE_COPY_JS_PATH, 'JavaScriptファイル');
  const articleTemplateExists = checkFileExists(ARTICLE_TEMPLATE_PATH, '記事テンプレート');
  const baseTemplateExists = checkFileExists(BASE_TEMPLATE_PATH, 'ベーステンプレート');
  console.log('');

  if (!cssExists || !jsExists || !articleTemplateExists || !baseTemplateExists) {
    console.error('\n❌ 必要なファイルが不足しています');
    process.exit(1);
  }

  // CSS内容確認
  console.log('🎨 CSSスタイル確認:');
  const cssContent = fs.readFileSync(SITE_CSS_PATH, 'utf8');
  checkCSSContent(cssContent);
  console.log('');

  // JavaScript内容確認
  console.log('⚙️ JavaScript機能確認:');
  const jsContent = fs.readFileSync(CODE_COPY_JS_PATH, 'utf8');
  checkJavaScriptContent(jsContent);
  console.log('');

  // テンプレート確認
  console.log('📄 テンプレート確認:');
  const articleTemplateContent = fs.readFileSync(ARTICLE_TEMPLATE_PATH, 'utf8');
  checkArticleTemplate(articleTemplateContent);
  const baseTemplateContent = fs.readFileSync(BASE_TEMPLATE_PATH, 'utf8');
  checkBaseTemplate(baseTemplateContent);
  console.log('');

  if (exitCode === 0) {
    console.log('✨ すべての検証が成功しました！');
  } else {
    console.error('💥 一部の検証が失敗しました');
  }

  process.exit(exitCode);
}

main();
