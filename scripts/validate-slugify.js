/**
 * Slugify Validation Test
 *
 * Purpose: slugify フィルターが Unicode 文字（日本語など）を安全に処理し、
 *          taxonomy ページの permalink 衝突を防げることを検証する
 *
 * Usage: npm run test:slugify
 *
 * Expected:
 * - 日本語カテゴリでも空文字にならない
 * - 記号のみ入力でもフォールバック値を返す
 * - 同一入力は常に同一 slug を返す
 */

const fs = require("fs");
const path = require("path");

function getSlugifyFilter() {
  const configModule = require("../.eleventy.js");
  const filters = {};

  const eleventyConfigStub = {
    addPassthroughCopy() {},
    addGlobalData() {},
    addNunjucksAsyncShortcode() {},
    addCollection() {},
    addFilter(name, filterFunction) {
      filters[name] = filterFunction;
    },
  };

  configModule(eleventyConfigStub);

  if (typeof filters.slugify !== "function") {
    throw new Error("slugify filter is not registered");
  }

  return filters.slugify;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const slugify = getSlugifyFilter();

  const englishSlug = slugify("General Category");
  assert(englishSlug === "general-category", "English slug normalization failed");

  const japaneseSlug = slugify("デザイン");
  assert(japaneseSlug.length > 0, "Japanese slug must not be empty");

  const symbolOnlySlug = slugify("###");
  assert(symbolOnlySlug === "untitled", "Symbol-only input must fallback to untitled");

  const deterministicA = slugify("デザイン");
  const deterministicB = slugify("デザイン");
  assert(deterministicA === deterministicB, "Slugify must be deterministic");

  const articlePath = path.join(__dirname, "../content/articles");
  const articleFiles = fs.readdirSync(articlePath).filter((fileName) => fileName.endsWith(".md"));

  const categories = [];
  for (const articleFile of articleFiles) {
    const articleContent = fs.readFileSync(path.join(articlePath, articleFile), "utf-8");
    const categoryMatch = articleContent.match(/^category:\s*(.+)$/m);

    if (categoryMatch && categoryMatch[1]) {
      categories.push(categoryMatch[1].trim());
    }
  }

  for (const categoryName of categories) {
    const categorySlug = slugify(categoryName);
    assert(categorySlug.length > 0, `Category slug must not be empty: ${categoryName}`);
  }

  console.log("✅ slugify validation passed");
}

try {
  main();
} catch (error) {
  console.error("❌ slugify validation failed");
  console.error(error.message);
  process.exit(1);
}
