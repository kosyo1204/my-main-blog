# 画像最適化ガイド（Eleventy）

このドキュメントは、Eleventy の画像最適化に関する設計・使い方・運用上の注意点をまとめます。

## 画像最適化（eleventy-img）

Eleventy のショートコードを使って画像を最適化できます。

```njk
{% image "/images/example.jpg", "代替テキスト" %}
```

`/images/...` は `static/images/` 配下のファイルを参照します。

## 導入内容（メモ）

- 画像ショートコードを追加（`.eleventy.js`）
- 依存関係に `@11ty/eleventy-img` を追加（`package.json`）

## 検証手順（Docker）

```bash
docker-compose run --rm web npm run build
```

## パフォーマンス改善のヒント

- 画像幅の配列（現在 320/640/960/1280）をレイアウトに合わせて調整する
- 画像の横幅が固定なら `sizes` を具体値にして生成数を抑える
- 画像数が増える場合はキャッシュディレクトリを明示し、ビルド時間を短縮する
