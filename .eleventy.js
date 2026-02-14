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

  // シンプルなテンプレート形式を返す
  return {
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
