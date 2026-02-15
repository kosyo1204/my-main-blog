/**
 * validate-typography.js
 *
 * Purpose: タイポグラフィ設定の検証
 * - Google Fonts の読み込み確認
 * - CSS変数の定義確認
 * - フォントファミリーの適用確認
 *
 * Usage:
 *   node scripts/validate-typography.js
 *
 * Expected:
 *   - base.njk に Google Fonts のリンクが存在
 *   - site.css に CSS変数が定義されている
 *   - Space Mono と Literata フォントが指定されている
 */

const fs = require('fs');
const path = require('path');

/**
 * テスト結果を集計
 */
class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  assert(condition, message) {
    if (condition) {
      this.passed++;
      console.log(`✓ ${message}`);
    } else {
      this.failed++;
      this.errors.push(message);
      console.error(`✗ ${message}`);
    }
  }

  summary() {
    console.log('\n' + '='.repeat(50));
    console.log(`Tests: ${this.passed + this.failed}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);

    if (this.failed > 0) {
      console.log('\nFailed tests:');
      this.errors.forEach(err => console.log(`  - ${err}`));
      process.exit(1);
    } else {
      console.log('\n✓ All typography validation tests passed!');
    }
  }
}

/**
 * base.njk の Google Fonts 読み込みを検証
 */
function validateGoogleFonts() {
  console.log('\n[1] Validating Google Fonts in base.njk...');

  const baseNjkPath = path.join(__dirname, '../content/_includes/layouts/base.njk');
  const content = fs.readFileSync(baseNjkPath, 'utf-8');

  const runner = new TestRunner();

  // Google Fonts preconnect の確認
  runner.assert(
    content.includes('rel="preconnect" href="https://fonts.googleapis.com"'),
    'Google Fonts preconnect link exists'
  );

  runner.assert(
    content.includes('rel="preconnect" href="https://fonts.gstatic.com" crossorigin'),
    'Google Fonts gstatic preconnect link exists with crossorigin'
  );

  // Space Mono フォントの確認
  runner.assert(
    content.includes('family=Space+Mono'),
    'Space Mono font is loaded'
  );

  // Literata フォントの確認
  runner.assert(
    content.includes('family=Literata'),
    'Literata font is loaded'
  );

  // font-display: swap の確認
  runner.assert(
    content.includes('display=swap'),
    'font-display: swap is specified for performance'
  );

  return runner;
}

/**
 * site.css の CSS変数を検証
 */
function validateCSSVariables() {
  console.log('\n[2] Validating CSS variables in site.css...');

  const cssPath = path.join(__dirname, '../static/css/site.css');
  const content = fs.readFileSync(cssPath, 'utf-8');

  const runner = new TestRunner();

  // フォント変数の確認
  runner.assert(
    content.includes('--font-display:'),
    'CSS variable --font-display is defined'
  );

  runner.assert(
    content.includes('--font-body:'),
    'CSS variable --font-body is defined'
  );

  runner.assert(
    content.includes('--font-mono:'),
    'CSS variable --font-mono is defined'
  );

  // Space Mono の使用確認
  runner.assert(
    content.includes("'Space Mono'"),
    'Space Mono font is specified in CSS variables'
  );

  // Literata の使用確認
  runner.assert(
    content.includes("'Literata'"),
    'Literata font is specified in CSS variables'
  );

  // フォントサイズ変数の確認
  const fontSizes = ['--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl', '--text-2xl', '--text-3xl', '--text-4xl', '--text-5xl'];
  fontSizes.forEach(size => {
    runner.assert(
      content.includes(`${size}:`),
      `CSS variable ${size} is defined`
    );
  });

  // 行間変数の確認
  const lineHeights = ['--leading-tight', '--leading-normal', '--leading-relaxed'];
  lineHeights.forEach(leading => {
    runner.assert(
      content.includes(`${leading}:`),
      `CSS variable ${leading} is defined`
    );
  });

  return runner;
}

/**
 * フォントの適用を検証
 */
function validateFontApplication() {
  console.log('\n[3] Validating font application in site.css...');

  const cssPath = path.join(__dirname, '../static/css/site.css');
  const content = fs.readFileSync(cssPath, 'utf-8');

  const runner = new TestRunner();

  // body に font-body が適用されているか
  runner.assert(
    content.includes('font-family: var(--font-body)'),
    'Body uses --font-body variable'
  );

  // h1-h3 に font-display が適用されているか
  runner.assert(
    /h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*font-family:\s*var\(--font-display\)/s.test(content),
    'Headings h1-h3 use --font-display variable'
  );

  // h4-h6 に font-body が適用されているか
  runner.assert(
    /h4\s*\{[^}]*font-family:\s*var\(--font-body\)/s.test(content) &&
      /h5\s*\{[^}]*font-family:\s*var\(--font-body\)/s.test(content) &&
      /h6\s*\{[^}]*font-family:\s*var\(--font-body\)/s.test(content),
    'Headings h4-h6 use --font-body variable'
  );

  // コードブロックに font-mono が適用されているか
  runner.assert(
    content.includes('font-family: var(--font-mono)'),
    'Code blocks use --font-mono variable'
  );

  // letter-spacing の適用確認
  runner.assert(
    content.includes('letter-spacing:'),
    'Letter spacing is applied for better typography'
  );

  // CSS変数を使用したフォントサイズの確認
  runner.assert(
    content.includes('font-size: var(--text-'),
    'Font sizes use CSS variables'
  );

  // CSS変数を使用した行間の確認
  runner.assert(
    content.includes('line-height: var(--leading-'),
    'Line heights use CSS variables'
  );

  return runner;
}

/**
 * メイン処理
 */
function main() {
  console.log('='.repeat(50));
  console.log('Typography Validation Test');
  console.log('='.repeat(50));

  const runners = [
    validateGoogleFonts(),
    validateCSSVariables(),
    validateFontApplication()
  ];

  // 全テストの結果を集計
  const totalPassed = runners.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = runners.reduce((sum, r) => sum + r.failed, 0);
  const allErrors = runners.flatMap(r => r.errors);

  console.log('\n' + '='.repeat(50));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total tests: ${totalPassed + totalFailed}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);

  if (totalFailed > 0) {
    console.log('\nFailed tests:');
    allErrors.forEach(err => console.log(`  - ${err}`));
    process.exit(1);
  } else {
    console.log('\n✓ All typography validation tests passed!');
    console.log('Typography modernization is complete.');
  }
}

main();
