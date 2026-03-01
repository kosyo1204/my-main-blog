---
title: タグ一覧
layout: layouts/base
permalink: /tags/index.html
---

# タグで探す

{% if collections.tags | length > 0 %}

## 利用可能なタグ

<div class="tag-list">
{%- for tag in collections.tags -%}
{%- set articlesWithTag = collections.articles | tagFilter(tag) -%}
<a href="{{ ('/tags/' + (tag | slugify) + '/') | url }}">{{ tag }} ({{ articlesWithTag | length }})</a>
{%- endfor -%}
</div>

{% else %}

## タグがまだありません

記事を公開すると、ここにタグが表示されます。

[ホームに戻る]({{ '/' | url }}){.btn}

{% endif %}
