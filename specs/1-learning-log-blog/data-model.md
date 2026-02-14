# Data Model: 学習ログブログ

この記事は `spec.md` の主要エンティティを詳細化したものです。

## Entities

### Article
- 説明: ブログ記事（Markdown ファイル + frontmatter）
- フィールド:
  - `id` (string): 内部識別子（ビルド時に生成される UUID 推奨）
  - `title` (string): 記事タイトル
  - `body` (string): Markdown 本文
  - `status` (enum): `draft` | `published` | `private`
  - `publish_date` (datetime | null): 公開日時（`published` の場合必須）
  - `created_at` (datetime): 作成日時
  - `updated_at` (datetime): 最終更新日時
  - `tags` (string[]): タグの配列（事前定義リストから選択）
  - `category` (string): カテゴリー（事前定義リストから選択）
  - `author` (string): 著者名（単一筆者想定だが将来複数対応可）
  - `slug` (string): YYYY-MM-DD-slug 形式の一意識別子
  - `hero_image` (string|null): 記事の代表画像パス（相対パス）

### Tag
- 説明: 事前定義されたタグ
- フィールド:
  - `id` (string)
  - `name` (string)
  - `slug` (string)

### Category
- 説明: 事前定義されたカテゴリ
- フィールド:
  - `id` (string)
  - `name` (string)
  - `slug` (string)

### AnalyticsEvent
- 説明: 記事のアクセス解析イベント（集計用）
- フィールド:
  - `article_id` (string)
  - `date` (date)
  - `source` (string): 流入元（referrer 等）
  - `views` (integer)

## Validation rules
- `title` は必須で 1..255 文字
- `slug` は必須で正規表現 `^[0-9]{4}-[0-9]{2}-[0-9]{2}[-a-z0-9]+$` に一致
- `status` が `published` の場合は `publish_date` が必須
- `tags` は事前定義リストに存在する値のみ許可
- 画像ファイルは 2MB 以下を推奨、ビルドで自動最適化

## State transitions (簡易)
- `draft` -> `published`: `publish_date` をセットして公開
- `published` -> `private`: ビルドから除外し、公開生成物を削除
- `draft` -> `deleted`: ファイル削除（履歴は Git により保持）

## Storage layout (推奨)
- `content/articles/YYYY/MM/` または `content/articles/` に Markdown ファイル
- 画像: `content/images/` または `static/images/`
- 設定ファイル: `config/site.config.(js|json)` にタグ/カテゴリの事前定義を管理

