#!/usr/bin/env node

/**
 * Test: validate-theme.js
 *
 * Purpose: カラーパレット変数とダークモードのオーバーライド、主要UIへのテーマ適用を検証する
 *
 * Usage: npm run test:theme
 * Expected: ✅ CSSにテーマ変数が定義され、ダークモード切替と主要要素（ヘッダー/リンク/h2）がテーマカラーを参照している
 */

const fs = require("fs");
const path = require("path");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

const cssPath = path.join(process.cwd(), "static", "css", "site.css");

console.log(`\n${colors.blue}[TEST] Validating theme system...${colors.reset}\n`);

if (!fs.existsSync(cssPath)) {
  console.error(`${colors.red}❌ ERROR:${colors.reset} CSS file not found at ${cssPath}`);
  process.exit(1);
}

const css = fs.readFileSync(cssPath, "utf-8");
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, test, expected, actual) {
  if (condition) {
    console.log(`${colors.green}✅ ${test}${colors.reset}`);
    passed++;
  } else {
    console.log(`${colors.red}❌ ${test}${colors.reset}`);
    failures.push({ test, expected, actual });
    failed++;
  }
}

const requiredVars = [
  "--color-primary-50",
  "--color-primary-100",
  "--color-primary-500",
  "--color-primary-700",
  "--color-primary-900",
  "--color-bg-primary",
  "--color-bg-secondary",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-text-tertiary",
  "--color-border",
  "--color-divider",
];

console.log("🎨 Checking color variable definitions...");
for (const name of requiredVars) {
  assert(
    css.includes(`${name}:`),
    `Variable defined: ${name}`,
    `${name} is defined in :root`,
    `${name} missing`
  );
}

console.log("\n🌙 Checking dark mode overrides...");
const darkOverrides = [
  "--color-bg-primary: #0a0a0a",
  "--color-bg-secondary: #171717",
  "--color-text-primary: #fafafa",
  "--color-text-secondary: #d4d4d4",
  "--color-text-tertiary: #737373",
  "--color-border: #262626",
  "--color-divider: #404040",
];
assert(
  darkOverrides.every((token) => css.includes(token)),
  "Dark mode variables override neutrals",
  `Includes overrides: ${darkOverrides.join(", ")}`,
  "Missing one or more dark overrides"
);

console.log("\n🖼️  Checking component usage...");
const hasHeaderGradient = /header\[role="banner"\][\s\S]*linear-gradient\([\s\S]*var\(--color-primary-50\)[\s\S]*var\(--color-bg-primary\)/m.test(
  css
);
assert(
  hasHeaderGradient,
  "Header uses gradient with theme colors",
  "linear-gradient with primary-50 and bg-primary",
  "Gradient not found"
);

const linkHoverUsesPrimary = /a:hover[\s\S]*var\(--color-primary-700\)/m.test(css);
assert(
  linkHoverUsesPrimary,
  "Links use primary-700 on hover",
  "a:hover references var(--color-primary-700)",
  "Hover color missing"
);

const h2UsesDivider = /h2[\s\S]*border-bottom:\s*2px\s+solid\s+var\(--color-divider\)/m.test(css);
assert(
  h2UsesDivider,
  "Headings use divider color",
  "h2 border uses var(--color-divider)",
  "Divider color missing on h2"
);

if (failed > 0) {
  console.log(`\n${colors.red}Summary: ${passed} passed, ${failed} failed${colors.reset}`);
  for (const failure of failures) {
    console.log(`- ${failure.test}`);
    console.log(`  Expected: ${failure.expected}`);
    console.log(`  Actual:   ${failure.actual}`);
  }
  process.exit(1);
}

console.log(`\n${colors.green}All theme checks passed!${colors.reset}`);
process.exit(0);
