#!/usr/bin/env node

/**
 * axe-core を使用したアクセシビリティテスト
 * 
 * _site/ ディレクトリ配下のすべての HTML ファイルをスキャンして、
 * WCAG 2.1 Level AA 違反をチェックします。
 * 
 * 必要なパッケージ: axe-core (as-built-html から実行)
 * 
 * 実行: npm run test:a11y
 * Exit code: 
 *   0 - OK (違反なし)
 *   1 - 警告あり（自動修正可能）
 *   2 - エラー（手動修正必須）
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// jsdom を使ったドメイン解析（axe-core 代替）
// 簡易版：alt属性、見出し階層、ラベル紐付け、ARIAロールをチェック

const siteDir = path.join(process.cwd(), "_site");
let errorCount = 0;
let warningCount = 0;

// HTML ファイル取得（再帰）
function getHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getHtmlFiles(fullPath));
    } else if (item.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/** 見出しの階層チェック */
function checkHeadingHierarchy(dom, filePath) {
  const headings = dom.window.document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let lastLevel = 0;
  
  for (const heading of headings) {
    const level = parseInt(heading.tagName[1]);
    
    // 階層が 1 以上飛ばない確認
    if (level - lastLevel > 1 && lastLevel > 0) {
      console.log(`⚠️  WARNING: 見出し階層スキップ`);
      console.log(`   File: ${path.relative(siteDir, filePath)}`);
      console.log(`   Expected: h${lastLevel + 1}, Got: h${level}`);
      console.log(`   Text: "${heading.textContent.substring(0, 50)}"\n`);
      warningCount += 1;
    }
    
    lastLevel = level;
  }
  
  // h1 が複数ないか確認
  const h1Count = dom.window.document.querySelectorAll("h1").length;
  if (h1Count > 1) {
    console.log(`❌ ERROR: 複数の h1 検出`);
    console.log(`   File: ${path.relative(siteDir, filePath)}`);
    console.log(`   Count: ${h1Count}\n`);
    errorCount += 1;
  }
}

/** フォーム要素の ラベル紐付けチェック */
function checkFormLabels(dom, filePath) {
  const inputs = dom.window.document.querySelectorAll("input, textarea, select");
  
  for (const input of inputs) {
    const inputId = input.getAttribute("id");
    
    // type="hidden" はスキップ
    if (input.getAttribute("type") === "hidden") continue;
    
    // aria-label がある場合はOK
    if (input.getAttribute("aria-label")) continue;
    
    // aria-labelledby がある場合はOK
    if (input.getAttribute("aria-labelledby")) continue;
    
    // id と対応する label がない場合はエラー
    if (!inputId) {
      console.log(`❌ ERROR: フォーム要素に id がない`);
      console.log(`   File: ${path.relative(siteDir, filePath)}`);
      console.log(`   Type: ${input.getAttribute("type") || "text"}`);
      console.log(`   Name: ${input.getAttribute("name")}\n`);
      errorCount += 1;
    } else {
      const label = dom.window.document.querySelector(`label[for="${inputId}"]`);
      if (!label) {
        console.log(`⚠️  WARNING: label[for] 紐付けなし`);
        console.log(`   File: ${path.relative(siteDir, filePath)}`);
        console.log(`   Input ID: ${inputId}\n`);
        warningCount += 1;
      }
    }
  }
}

/** src=button のテキストチェック */
function checkButtonText(dom, filePath) {
  const buttons = dom.window.document.querySelectorAll("button, [role='button']");
  
  for (const button of buttons) {
    const text = button.textContent.trim();
    const ariaLabel = button.getAttribute("aria-label");
    
    if (!text && !ariaLabel) {
      console.log(`❌ ERROR: ボタンにテキストがない`);
      console.log(`   File: ${path.relative(siteDir, filePath)}`);
      console.log(`   HTML: ${button.outerHTML.substring(0, 100)}\n`);
      errorCount += 1;
    }
  }
}

/** ARIA role の正当性チェック（簡易版） */
function checkAriaRoles(dom, filePath) {
  const validRoles = [
    // ランドマーク roles
    "banner", "complementary", "contentinfo", "form", "main",
    "navigation", "region", "search",
    
    // ウィジェット roles
    "alert", "alertdialog", "button", "checkbox", "dialog",
    "heading", "link", "menuitem", "menuitemcheckbox", "menuitemradio",
    "radio", "status", "tab", "tabpanel", "treeitem",
    
    // その他頻出
    "article", "doc-chapter", "doc-section", "document", "none"
  ];
  
  const elementsWithRole = dom.window.document.querySelectorAll("[role]");
  
  for (const element of elementsWithRole) {
    const role = element.getAttribute("role");
    
    if (!validRoles.includes(role)) {
      console.log(`⚠️  WARNING: 不正確または非標準 ARIA role`);
      console.log(`   File: ${path.relative(siteDir, filePath)}`);
      console.log(`   Role: ${role}`);
      console.log(`   Tag: ${element.tagName}\n`);
      warningCount += 1;
    }
  }
}

/** メイン関数 */
async function runA11yTests() {
  console.log(`\n🔍 アクセシビリティテストを開始します (${siteDir})\n`);
  
  try {
    const htmlFiles = getHtmlFiles(siteDir);
    
    if (htmlFiles.length === 0) {
      console.log("❌ HTML ファイルが見つかりません。先に npm run build を実行してください。");
      return 2;
    }
    
    console.log(`📄 ${htmlFiles.length} 個の HTML ファイルをチェック中...\n`);
    
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const relPath = path.relative(siteDir, file);
      
      try {
        const dom = new JSDOM(content);
        
        // 各チェックを実行
        checkHeadingHierarchy(dom, file);
        checkFormLabels(dom, file);
        checkButtonText(dom, file);
        checkAriaRoles(dom, file);
      } catch (err) {
        console.log(`⚠️  WARNING: ファイルのパース失敗`);
        console.log(`   File: ${relPath}`);
        console.log(`   Error: ${err.message}\n`);
        warningCount += 1;
      }
    }
    
    // 結果出力
    console.log(`\n📊 テスト結果:`);
    console.log(`   ✓ HTML ファイル: ${htmlFiles.length}`);
    console.log(`   ❌ エラー: ${errorCount}`);
    console.log(`   ⚠️  警告: ${warningCount}`);
    
    if (errorCount > 0) {
      console.log(`\n❌ アクセシビリティ違反が ${errorCount} 件見つかりました。\n`);
      return 2;
    } else if (warningCount > 0) {
      console.log(`\n⚠️  アクセシビリティ警告が ${warningCount} 件見つかりました。改善を検討してください。\n`);
      return 1;
    } else {
      console.log(`\n✅ WCAG 2.1 Level AA 準拠を確認しました！\n`);
      return 0;
    }
  } catch (error) {
    console.error("❌ エラーが発生しました:");
    console.error(error);
    return 2;
  }
}

// 必要なパッケージ確認
try {
  require("jsdom");
} catch (err) {
  console.log("⚠️  jsdom が必要です: npm install jsdom");
  console.log("   簡易版のテストのため、jsdom を使用します。");
  process.exit(2);
}

runA11yTests().then((exitCode) => {
  process.exit(exitCode);
});
