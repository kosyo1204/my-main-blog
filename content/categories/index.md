---
title: カテゴリー一覧
layout: layouts/base
permalink: /categories/index.html
---

# カテゴリーで探す

{% if collections.categories | length > 0 %}

## 利用可能なカテゴリー

{% for category in collections.categories %}
{% set articlesWithCategory = [] %}
{% for article in collections.articles %}
  {% if article.data.category == category %}
    {% set articlesWithCategory = articlesWithCategory.concat(article) %}
  {% endif %}
{% endfor %}
- **[{{ category }}](/categories/{{ category | slugify }})** ({{ articlesWithCategory | length }} 記事)
{% endfor %}

{% else %}

## カテゴリーがまだありません

記事を公開すると、ここにカテゴリーが表示されます。

[ホームに戻る](/){.btn}

{% endif %}
