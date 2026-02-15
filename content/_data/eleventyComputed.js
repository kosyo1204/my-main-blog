/**
 * eleventyComputed.js
 * 
 * Purpose: Dynamically compute Eleventy configuration per-template
 * 
 * Docs: https://www.11ty.dev/docs/data-eleventy-supplied/#eleventycomputed
 */

module.exports = {
  // ========== Computed Title ==========

  /**
   * Ensure title is always defined
   * Falls back to filename if no title in frontmatter
   */
  title: (data) => {
    if (data.title) {
      return data.title;
    }

    // Extract title from filename if not in frontmatter
    // Example: "2026-02-14-my-article.md" -> "My Article"
    const filename = data.page.filePathStem.split("/").pop();
    return filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  },
};
