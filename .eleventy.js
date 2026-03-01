// Eleventy の基本設定
// - 入力ディレクトリ: content
// - 出力ディレクトリ: _site
const path = require("path");

// eleventy-img は sharp に依存するため、環境によってはロードに失敗する
// CI で失敗した場合は最適化をスキップして通常の img にフォールバックする
function getImageModule() {
  try {
    // eslint-disable-next-line global-require
    return require("@11ty/eleventy-img");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("eleventy-img unavailable, fallback to plain img:", error);
    return null;
  }
}

// 文字列属性用の簡易エスケープ（属性インジェクション防止）
function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

// 画像パスを解決（/images/... は static 配下として扱う）
function resolveImagePath(src) {
  if (src.startsWith("/")) {
    return path.join(process.cwd(), "static", src.replace(/^\//, ""));
  }

  return path.join(process.cwd(), "content", src);
}

module.exports = function (eleventyConfig) {
  // 画像などの静的ファイルを出力ディレクトリへコピー
  eleventyConfig.addPassthroughCopy({ "static/": "/" });

  // グローバルデータ: 現在の日付（sitemap 用）
  eleventyConfig.addGlobalData("buildDate", () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  // ========== Filters ==========

  /**
   * dateISO フィルター
   * 日付を ISO 8601 形式（YYYY-MM-DD）に変換
   * 
   * Usage: {{ publishedAt | dateISO }}
   * Input: "2026-02-14" or Date object
   * Output: "2026-02-14"
   */
  eleventyConfig.addFilter("dateISO", (dateValue) => {
    if (!dateValue) return "";
    
    // 既に文字列の場合（"2026-02-14"）
    if (typeof dateValue === "string") {
      const dateObj = new Date(dateValue);
      if (isNaN(dateObj.getTime())) {
        // パース失敗時は元の値をそのまま返す
        return dateValue;
      }
      dateValue = dateObj;
    }

    // Date オブジェクトから ISO 形式を抽出
    if (dateValue instanceof Date) {
      const year = dateValue.getFullYear();
      const month = String(dateValue.getMonth() + 1).padStart(2, "0");
      const day = String(dateValue.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  });

  /**
   * tagFilter フィルター
   * articles コレクションから指定タグを持つ記事をフィルタリング
   * 
   * Usage: {% set articlesWithTag = collections.articles | tagFilter("sample") %}
   * Input: articles array, tag name
   * Output: filtered articles array
   */
  eleventyConfig.addFilter("tagFilter", (articles, tag) => {
    if (!tag) return articles;
    return articles.filter((article) => {
      return article.data.tags && article.data.tags.includes(tag);
    });
  });

  /**
   * slugify フィルター
   * 文字列をスラッグ形式に変換（URL パス用）
   * 
   * Usage: {{ "My Article Title" | slugify }}
   * Input: "My Article Title"
   * Output: "my-article-title"
   */
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return "";

    // Unicode 文字（日本語など）を保持しつつ、URL パスとして安全な形式に整える。
    // 以前の実装は \w のみ許可していたため、日本語カテゴリが空文字になり
    // /categories/index.html へ衝突していた。
    const normalizedSlug = String(str)
      .normalize("NFKC")
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, "-")
      .replace(/[^\p{L}\p{N}_-]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // 記号のみなどで空になった場合は衝突回避のため固定値を返す。
    return normalizedSlug || "untitled";
  });

  /**
   * date フィルター
   * 日付をフォーマット済み文字列に変換
   * 
   * Usage: {{ publishedAt | date("YYYY-MM-DD") }}
   * Input: Date object, format string
   * Output: formatted date string
   */
  eleventyConfig.addFilter("date", (dateValue, format) => {
    if (!dateValue) return "";
    
    let dateObj = dateValue;
    if (typeof dateValue === "string") {
      // YYYY-MM-DD 形式の文字列を UTC として明示的にパース
      // タイムゾーン問題を回避（off-by-one 防止）
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        dateObj = new Date(dateValue + "T00:00:00Z");
      } else {
        dateObj = new Date(dateValue);
      }
    }
    
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return "";
    }

    // 簡易な format サポート（YYYY-MM-DD）
    if (format === "YYYY-MM-DD") {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return dateObj.toISOString().split("T")[0];
  });

  // ========== Image Shortcode ==========

  // 画像最適化ショートコード: {% image "/images/foo.jpg", "代替テキスト" %}
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, sizes = "100vw", className = "") {
      try {
        if (!alt) {
          // アクセシビリティのため alt を推奨（空も許可）
          // eslint-disable-next-line no-console
          console.warn("image shortcode: alt is empty for src=", src);
        }

        const Image = getImageModule();
        if (!Image) {
          return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt || "")}" />`;
        }

        const imagePath = resolveImagePath(src);
        const metadata = await Image(imagePath, {
          widths: [320, 640, 960, 1280],
          formats: ["avif", "webp", "jpeg"],
          urlPath: "/images/",
          outputDir: "./_site/images/",
        });

        return Image.generateHTML(metadata, {
          alt: alt || "",
          sizes,
          loading: "lazy",
          decoding: "async",
          class: className,
        });
      } catch (error) {
        // 失敗時はビルドを止めずに元画像を表示（ログに詳細を残す）
        // eslint-disable-next-line no-console
        console.error("image shortcode error:", error);
        return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt || "")}" />`;
      }
    }
  );

  // ========== Collections ==========

  /**
   * articles コレクション
   * すべての記事を含む（日付順）
   * 
   * Usage in templates: {% for article in collections.articles %}
   */
  eleventyConfig.addCollection("articles", (collection) => {
    return collection
      .getFilteredByGlob("content/articles/**/*.md")
      .sort((a, b) => {
        // 新しい記事が最初に表示されるようソート
        const dateA = new Date(a.data.publishedAt || a.data.date);
        const dateB = new Date(b.data.publishedAt || b.data.date);
        return dateB - dateA;
      });
  });

  /**
   * tags コレクション
   * すべての記事のタグを収集し、タグ別に整理
   * 
   * Usage in templates: {% for tag in collections.tags %}
   */
  eleventyConfig.addCollection("tags", (collection) => {
    const tagSet = new Set();
    const articles = collection.getFilteredByGlob("content/articles/**/*.md");
    
    articles.forEach((item) => {
      if (item.data.published !== false && item.data.tags) {
        item.data.tags.forEach((tag) => {
          if (tag) {
            tagSet.add(tag);
          }
        });
      }
    });

    return Array.from(tagSet).sort();
  });

  /**
   * categories コレクション
   * すべての記事のカテゴリーを収集
   * 
   * Usage in templates: {% for category in collections.categories %}
   */
  eleventyConfig.addCollection("categories", (collection) => {
    const categorySet = new Set();
    const articles = collection.getFilteredByGlob("content/articles/**/*.md");
    
    articles.forEach((item) => {
      if (item.data.published !== false && item.data.category) {
        categorySet.add(item.data.category);
      }
    });

    return Array.from(categorySet).sort();
  });

  // シンプルなテンプレート形式を返す
  return {
    pathPrefix: "/my-main-blog/",
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
