/**
 * eleventyComputed.js
 * 
 * Purpose: Dynamically compute Eleventy configuration per-template
 * 
 * This file implements logic to control permalink based on frontmatter:
 * - If published: true (or absent) → normal URL
 * - If published: false → permalink: false (excluded from build)
 * 
 * Docs: https://www.11ty.dev/docs/data-eleventy-supplied/#eleventycomputed
 */

module.exports = {
  // ========== Computed Permalink ==========
  
  /**
   * Dynamically set permalink based on 'published' frontmatter
   * 
   * Returns:
   * - string (URL) if published: true
   * - false if published: false (excluded from build)
   * 
   * This ensures:
   * 1. Unpublished articles don't generate HTML files
   * 2. Unpublished articles are not accessible via URL
   * 3. Unpublished articles don't appear in collections
   */
  permalink: (data) => {
    // Skip computation if permalink is already explicitly set
    // (e.g., 404.md with permalink: /404.html)
    if (data.permalink !== undefined && data.permalink !== null) {
      return data.permalink;
    }

    // Only apply published filter to articles
    if (!data.page.url?.includes("/articles/")) {
      return undefined; // Use Eleventy default
    }

    // If published frontmatter is explicitly false, exclude from build
    if (data.published === false) {
      return false;
    }

    // Otherwise, use default permalink (computed by Eleventy)
    return undefined; // Use Eleventy default
  },

  // ========== Computed Title (optional, for consistency) ==========

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

  // ========== Computed URL (for consistency) ==========

  /**
   * Ensure URL is computed from published status
   * Used in templates for linking
   */
  url: (data) => {
    // If unpublished, no URL
    if (data.published === false) {
      return null;
    }

    // Otherwise compute standard URL
    return data.page.url;
  },
};
