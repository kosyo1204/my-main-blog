#!/usr/bin/env node

/**
 * alt 属性検証スクリプト
 * 
 * _site/ ディレクトリ配下のすべての HTML ファイルをスキャンして、
 * img タグの alt 属性をチェックします。
 * 
 * 警告:
 * - alt 属性がない img タグ
 * - alt="" な装飾画像（要件により許可、ただし意図的か確認）
 * 
 * 実行: npm run test:alt-text  
 * Exit code: 0 (OK) | 1 (警告あり) | 2 (エラー)
 */

const fs = require("fs");
const path = require("path");

// HTML から img タグを抽出する簡易正規表現
const imgTagRegex = /<img[^>]*>/gi;
const altAttrRegex = /\salt=["']([^"']*)["']/i;
const srcAttrRegex = /\ssrc=["']([^"']*)["']/i;

let warningCount = 0;
const siteDir = path.join(process.cwd(), "_site");

// 再帰的にディレクトリをスキャンして HTML ファイルを取得
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

async function validateAltText() {
  console.log(`\n🔍 alt 属性検証を開始します (${siteDir})\n`);
  
  try {
    // _site/ 配下のすべての HTML ファイルを取得
    const htmlFiles = getHtmlFiles(siteDir);
    
    if (htmlFiles.length === 0) {
      console.log("❌ HTML ファイルが見つかりません。先に npm run build を実行してください。");
      return 2;
    }
    
    console.log(`📄 ${htmlFiles.length} 個の HTML ファイルをチェック中...\n`);
    
    // 各 HTML ファイルをスキャン
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const relPath = path.relative(siteDir, file);
      
      const imgTags = content.match(imgTagRegex) || [];
      
      for (const imgTag of imgTags) {
        const altMatch = imgTag.match(altAttrRegex);
        const srcMatch = imgTag.match(srcAttrRegex);
        const src = srcMatch ? srcMatch[1] : "unknown";
        
        if (!altMatch) {
          // alt 属性がない
          console.log(`⚠️  WARNING: alt 属性なし`);
          console.log(`   File: ${relPath}`);
          console.log(`   Tag: ${imgTag.substring(0, 100)}`);
          console.log(`   Src: ${src}\n`);
          warningCount += 1;
        } else if (altMatch[1] === "") {
          // alt="" （装飾画像として許可、ただし警告）
          console.log(`ℹ️  INFO: alt="" の装飾画像`);
          console.log(`   File: ${relPath}`);
          console.log(`   Src: ${src}\n`);
          // 装飾画像は許可だがカウントはしない
        }
      }
    }
    
    // 結果出力
    console.log(`\n📊 検証結果:`);
    console.log(`   ✓ HTML ファイル: ${htmlFiles.length}`);
    console.log(`   ⚠️  alt 属性なし: ${warningCount}`);
    
    if (warningCount > 0) {
      console.log(`\n❌ alt 属性の問題が ${warningCount} 件見つかりました。`);
      console.log(`   修正方法: img タグに alt="..." 属性を追加してください\n`);
      return 1;
    } else {
      console.log(`\n✅ すべての img タグに alt 属性があります！\n`);
      return 0;
    }
  } catch (error) {
    console.error("❌ エラーが発生しました:");
    console.error(error);
    return 2;
  }
}

validateAltText().then((exitCode) => {
  process.exit(exitCode);
});
