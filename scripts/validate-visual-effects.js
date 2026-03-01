/**
 * Visual Effects Validation Test
 *
 * Purpose: シャドウ・背景効果・視覚詳細の実装を検証
 * - CSS変数（シャドウ、ボーダー半径）の定義確認
 * - 要素へのシャドウ適用確認
 * - 背景パターン・グラデーションの適用確認
 * - ダークモード対応確認
 *
 * Usage: npm run test:visual-effects
 *
 * Expected: すべてのチェックがパスする
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const cssPath = path.join(__dirname, '../static/css/site.css');
const outputDir = path.join(__dirname, '../_site');

// テストケウンター
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function logTest(testName, passed, details = '') {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`✓ ${testName}`);
  } else {
    failedTests++;
    console.error(`✗ ${testName}`);
    if (details) {
      console.error(`  ${details}`);
    }
  }
}

function testCSSContent() {
  console.log('\n=== CSS変数とスタイル定義のテスト ===\n');

  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  // 1. シャドウシステムのCSS変数
  logTest(
    'Shadow System: --shadow-sm が定義されている',
    cssContent.includes('--shadow-sm:')
  );
  logTest(
    'Shadow System: --shadow-md が定義されている',
    cssContent.includes('--shadow-md:')
  );
  logTest(
    'Shadow System: --shadow-lg が定義されている',
    cssContent.includes('--shadow-lg:')
  );
  logTest(
    'Shadow System: --shadow-xl が定義されている',
    cssContent.includes('--shadow-xl:')
  );
  logTest(
    'Shadow System: --shadow-2xl が定義されている',
    cssContent.includes('--shadow-2xl:')
  );
  logTest(
    'Shadow System: --shadow-inner が定義されている',
    cssContent.includes('--shadow-inner:')
  );

  // 2. ボーダー半径のCSS変数
  logTest(
    'Border Radius: --radius-sm が定義されている',
    cssContent.includes('--radius-sm:')
  );
  logTest(
    'Border Radius: --radius-md が定義されている',
    cssContent.includes('--radius-md:')
  );
  logTest(
    'Border Radius: --radius-lg が定義されている',
    cssContent.includes('--radius-lg:')
  );
  logTest(
    'Border Radius: --radius-full が定義されている',
    cssContent.includes('--radius-full:')
  );

  // 3. シャドウの適用確認
  logTest(
    'Article Card: box-shadow が適用されている',
    /\.article-card\s*\{[^}]*box-shadow:\s*var\(--shadow-md\)/s.test(cssContent)
  );
  logTest(
    'Header: box-shadow が適用されている',
    /header\[role="banner"\]\s*\{[^}]*box-shadow:/s.test(cssContent)
  );
  logTest(
    'Tags: box-shadow が適用されている',
    /\.(category-list|tag-list)\s+a[^}]*box-shadow:/s.test(cssContent)
  );

  // 4. ボーダー半径の適用確認
  logTest(
    'Article Card: border-radius が適用されている',
    /\.article-card\s*\{[^}]*border-radius:\s*var\(--radius-lg\)/s.test(cssContent)
  );
  logTest(
    'Buttons: border-radius が適用されている',
    /(button|\.btn)\s*\{[^}]*border-radius:\s*var\(--radius-md\)/s.test(cssContent)
  );
  logTest(
    'Tags: border-radius が適用されている (pill shape)',
    /\.(category-list|tag-list)\s+a[^}]*border-radius:\s*var\(--radius-full\)/s.test(cssContent)
  );

  // 5. 背景効果の確認
  logTest(
    'Header: background-image が適用されている',
    /header\[role="banner"\][^}]*background-image:/s.test(cssContent)
  );
  logTest(
    'Header: Glassmorphism (backdrop-filter) が適用されている',
    /header\[role="banner"\][^}]*backdrop-filter:/s.test(cssContent)
  );
  logTest(
    'Footer: gradient が適用されている',
    /footer\[role="contentinfo"\][^}]*background:[^}]*linear-gradient/s.test(cssContent)
  );
  logTest(
    'Body::before: ノイズテクスチャが適用されている',
    /body::before[^}]*background-image:[^}]*data:image\/svg/s.test(cssContent)
  );
  logTest(
    'Body::after: 装飾的トップバーが適用されている',
    /body::after[^}]*background:[^}]*linear-gradient/s.test(cssContent)
  );

  // 6. ダークモード対応
  logTest(
    'Dark Mode: シャドウ変数のオーバーライドがある',
    /@media\s*\(prefers-color-scheme:\s*dark\)[^}]*--shadow-sm:/s.test(cssContent)
  );

  // ダークモード内でheaderのスタイルがある確認（より柔軟なマッチング）
  const darkModeSection = cssContent.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?\n\}/);
  const hasDarkModeHeader = darkModeSection && /header\[role="banner"\][\s\S]*?background/i.test(darkModeSection[0]);

  logTest(
    'Dark Mode: ヘッダーの背景色がオーバーライドされている',
    hasDarkModeHeader
  );
}

function testBuiltHTML() {
  console.log('\n=== ビルド済みHTML確認 ===\n');

  // インデックスページの確認
  const indexPath = path.join(outputDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    logTest('index.html が存在する', false, `ファイルが見つかりません: ${indexPath}`);
    return;
  }

  logTest('index.html が存在する', true);

  const htmlContent = fs.readFileSync(indexPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // CSSファイルがリンクされているか確認
  const cssLink = document.querySelector('link[href*="css/site.css"]');
  logTest(
    'site.css がリンクされている',
    cssLink !== null,
    cssLink ? '' : 'link[href*="css/site.css"] が見つかりません'
  );

  // 主要な要素が存在するか確認
  const header = document.querySelector('header[role="banner"]');
  logTest('ヘッダーが存在する', header !== null);

  const footer = document.querySelector('footer[role="contentinfo"]');
  logTest('フッターが存在する', footer !== null);
}

function main() {
  console.log('======================================');
  console.log('Visual Effects Validation Test');
  console.log('======================================');

  testCSSContent();
  testBuiltHTML();

  console.log('\n======================================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log('======================================\n');

  if (failedTests > 0) {
    console.error('❌ テストが失敗しました');
    process.exit(1);
  } else {
    console.log('✅ すべてのテストがパスしました');
    process.exit(0);
  }
}

main();
