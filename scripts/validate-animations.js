#!/usr/bin/env node

/**
 * アニメーション実装テスト
 * 
 * Purpose: UIアニメーションとマイクロインタラクションが正しく実装されているか検証
 * - CSS アニメーション定義の存在
 * - JavaScript ファイルの存在
 * - prefers-reduced-motion 対応
 * - base.njk に animations.js が読み込まれているか
 * 
 * Usage: npm run test:animations
 * 
 * Expected:
 *   - static/css/site.css にアニメーション定義が存在
 *   - static/js/animations.js が存在
 *   - prefers-reduced-motion メディアクエリが存在
 *   - base.njk に animations.js が読み込まれている
 */

const fs = require('fs');
const path = require('path');

let exitCode = 0;

console.log('🎬 アニメーション実装テスト開始...\n');

// 1. CSS ファイルのチェック
const cssPath = path.join(process.cwd(), 'static/css/site.css');
console.log('1️⃣  CSS アニメーション定義をチェック...');

if (!fs.existsSync(cssPath)) {
  console.error('❌ static/css/site.css が見つかりません');
  exitCode = 1;
} else {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  
  // fadeInUp アニメーション定義のチェック
  if (!cssContent.includes('@keyframes fadeInUp')) {
    console.error('❌ @keyframes fadeInUp が定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ @keyframes fadeInUp が定義されています');
  }
  
  // スムーススクロール
  if (!cssContent.includes('scroll-behavior: smooth')) {
    console.error('❌ scroll-behavior: smooth が設定されていません');
    exitCode = 1;
  } else {
    console.log('✅ scroll-behavior: smooth が設定されています');
  }
  
  // animate-in クラス
  if (!cssContent.includes('.animate-in')) {
    console.error('❌ .animate-in クラスが定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ .animate-in クラスが定義されています');
  }
  
  // prefers-reduced-motion 対応
  if (!cssContent.includes('@media (prefers-reduced-motion: reduce)')) {
    console.error('❌ prefers-reduced-motion メディアクエリがありません');
    exitCode = 1;
  } else {
    console.log('✅ prefers-reduced-motion メディアクエリが存在します');
  }
  
  // リンクアニメーション（::after 疑似要素）
  if (!cssContent.match(/a::after\s*{[\s\S]*?transition:/)) {
    console.error('❌ リンクの ::after アニメーションが定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ リンクの ::after アニメーションが定義されています');
  }
  
  // ボタンリップル効果（::before 疑似要素）
  if (!cssContent.match(/button::before[\s\S]*?\.btn::before/)) {
    console.error('❌ ボタンのリップル効果が定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ ボタンのリップル効果が定義されています');
  }
  
  // カードホバー効果（transform）
  if (!cssContent.match(/\.article-card:hover[\s\S]*?transform:/)) {
    console.error('❌ カードのホバー効果（transform）が定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ カードのホバー効果（transform）が定義されています');
  }
  
  // ナビゲーションのアクティブ状態
  if (!cssContent.includes('nav a[aria-current="page"]')) {
    console.error('❌ ナビゲーションのアクティブ状態が定義されていません');
    exitCode = 1;
  } else {
    console.log('✅ ナビゲーションのアクティブ状態が定義されています');
  }
}

console.log('');

// 2. JavaScript ファイルのチェック
const jsPath = path.join(process.cwd(), 'static/js/animations.js');
console.log('2️⃣  JavaScript ファイルをチェック...');

if (!fs.existsSync(jsPath)) {
  console.error('❌ static/js/animations.js が見つかりません');
  exitCode = 1;
} else {
  const jsContent = fs.readFileSync(jsPath, 'utf-8');
  
  // Intersection Observer の使用
  if (!jsContent.includes('IntersectionObserver')) {
    console.error('❌ Intersection Observer が使用されていません');
    exitCode = 1;
  } else {
    console.log('✅ Intersection Observer が使用されています');
  }
  
  // prefers-reduced-motion チェック
  if (!jsContent.includes('prefers-reduced-motion')) {
    console.error('❌ prefers-reduced-motion のチェックがありません');
    exitCode = 1;
  } else {
    console.log('✅ prefers-reduced-motion のチェックがあります');
  }
  
  // animate-in クラスの追加
  if (!jsContent.includes('.animate-in')) {
    console.error('❌ animate-in クラスの追加処理がありません');
    exitCode = 1;
  } else {
    console.log('✅ animate-in クラスの追加処理があります');
  }
  
  // unobserve によるパフォーマンス最適化
  if (!jsContent.includes('unobserve')) {
    console.error('❌ unobserve によるパフォーマンス最適化がありません');
    exitCode = 1;
  } else {
    console.log('✅ unobserve によるパフォーマンス最適化があります');
  }
}

console.log('');

// 3. base.njk のチェック
const baseNjkPath = path.join(process.cwd(), 'content/_includes/layouts/base.njk');
console.log('3️⃣  base.njk への統合をチェック...');

if (!fs.existsSync(baseNjkPath)) {
  console.error('❌ base.njk が見つかりません');
  exitCode = 1;
} else {
  const baseNjkContent = fs.readFileSync(baseNjkPath, 'utf-8');
  
  // animations.js の読み込み
  if (!baseNjkContent.includes('animations.js')) {
    console.error('❌ base.njk に animations.js が読み込まれていません');
    exitCode = 1;
  } else {
    console.log('✅ base.njk に animations.js が読み込まれています');
  }
  
  // defer 属性のチェック
  if (!baseNjkContent.match(/<script[^>]*animations\.js[^>]*defer/)) {
    console.error('⚠️  animations.js に defer 属性が推奨されます');
    // 警告のみ、エラーにはしない
  } else {
    console.log('✅ animations.js に defer 属性が設定されています');
  }
}

console.log('');

// 4. ビルド出力のチェック（_site が存在する場合）
const siteDir = path.join(process.cwd(), '_site');
if (fs.existsSync(siteDir)) {
  console.log('4️⃣  ビルド出力をチェック...');
  
  const builtCssPath = path.join(siteDir, 'css/site.css');
  const builtJsPath = path.join(siteDir, 'js/animations.js');
  
  if (!fs.existsSync(builtCssPath)) {
    console.error('❌ ビルド後の CSS ファイルが見つかりません');
    exitCode = 1;
  } else {
    console.log('✅ ビルド後の CSS ファイルが存在します');
  }
  
  if (!fs.existsSync(builtJsPath)) {
    console.error('❌ ビルド後の JS ファイルが見つかりません');
    exitCode = 1;
  } else {
    console.log('✅ ビルド後の JS ファイルが存在します');
  }
  
  console.log('');
}

// 結果サマリー
console.log('==========================================');
if (exitCode === 0) {
  console.log('✅ すべてのアニメーションテストに合格しました！');
} else {
  console.error('❌ アニメーションテストに失敗しました');
}
console.log('==========================================\n');

process.exit(exitCode);
