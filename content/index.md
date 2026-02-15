---
title: ホーム
layout: layouts/base
---

## 公開記事

{% if collections.articles | length > 0 %}
### 最新の記事

{% for article in collections.articles %}
- **[{{ article.data.title }}]({{ article.url }})** — {{ article.data.publishedAt | dateISO }}
  {% if article.data.tags %}
    {% set tagList = article.data.tags | join(", ") %}
  _Tags: {{ tagList }}_
  {% endif %}
{% endfor %}

**[すべての記事を見る](/tags/)**
{% else %}
### 記事はまだありません

このブログに公開された記事はまだありません。後に戻ってきてください。

[タグで探す](/tags/) | [カテゴリーで探す](/categories/)
{% endif %}

---

### このブログについて

このブログは Eleventy と Markdown で構築されています。

