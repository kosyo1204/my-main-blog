---
title: タグ一覧
layout: layouts/base
permalink: /tags/index.html
---

# タグで探す

{% if collections.tags | length > 0 %}

## 利用可能なタグ

{% for tag in collections.tags %}
{% set articlesWithTag = collections.articles | tagFilter(tag) %}
- **[{{ tag }}](/tags/{{ tag | slugify }})** ({{ articlesWithTag | length }} 記事)
{% endfor %}

{% else %}

## タグがまだありません

記事を公開すると、ここにタグが表示されます。

[ホームに戻る](/){.btn}

{% endif %}
