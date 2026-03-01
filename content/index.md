---
title: ホーム
layout: layouts/base
templateEngine: md,njk
---

## 公開記事

{% if collections.articles | length > 0 %}
### 最新の記事

<div class="articles-grid">
{%- for article in collections.articles -%}
<article class="article-card">
  <div class="article-meta">
    <time datetime="{{ article.data.publishedAt | dateISO }}">{{ article.data.publishedAt | dateISO }}</time>
    {%- if article.data.category -%}
    <span class="article-category">{{ article.data.category }}</span>
    {%- endif -%}
  </div>
  <h2 class="article-title">
    <a href="{{ article.url | url }}">{{ article.data.title }}</a>
  </h2>
  {%- if article.data.excerpt -%}
  <p class="article-excerpt">{{ article.data.excerpt }}</p>
  {%- endif -%}
  {%- if article.data.tags -%}
  <div class="article-tags tag-list">
    {%- for tag in article.data.tags -%}
    <a href="{{ ('/tags/' + (tag | slugify) + '/') | url }}" class="tag">{{ tag }}</a>
    {%- endfor -%}
  </div>
  {%- endif -%}
</article>
{%- endfor -%}
</div>

**[すべての記事を見る]({{ '/tags/' | url }})**
{% else %}
### 記事はまだありません

このブログに公開された記事はまだありません。後に戻ってきてください。

[タグで探す]({{ '/tags/' | url }}) | [カテゴリーで探す]({{ '/categories/' | url }})
{% endif %}

---

### このブログについて

このブログは Eleventy と Markdown で構築されています。

