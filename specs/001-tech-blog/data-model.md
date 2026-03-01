# データモデル: Learning Log Blog

## Entity: Article

- **概要**: 学習ログの本文とメタ情報を保持する。
- **主要フィールド**:
  - `title` (string, 必須)
  - `slug` (string, 必須, 一意)
  - `body` (markdown, 必須)
  - `published` (boolean, 必須, default: false)
  - `publishedAt` (date, optional)
  - `tags` (string[], optional)
  - `category` (string, optional)
  - `seoTitle` (string, optional)
  - `seoDescription` (string, optional)
- **関連**:
  - Tag: 多対多（Article.tags に格納）
  - Category: 多対一（Article.category に格納）

## Entity: Tag

- **概要**: 記事を横断して整理するラベル。
- **主要フィールド**:
  - `name` (string, 必須, 一意)
  - `slug` (string, 必須, 一意)
- **関連**:
  - Article: 多対多

## Entity: Category

- **概要**: 記事の主分類。
- **主要フィールド**:
  - `name` (string, 必須, 一意)
  - `slug` (string, 必須, 一意)
- **関連**:
  - Article: 一対多

## Entity: AnalyticsSummary

- **概要**: 記事ごとの PV と流入元の概要。
- **主要フィールド**:
  - `articleSlug` (string, 必須)
  - `pageViews` (number, 必須)
  - `referrers` (map<string, number>, optional)
- **関連**:
  - Article: 一対一（集計参照）

## Entity: Repository

- **概要**: Private/Public の区分と格納対象の定義。
- **主要フィールド**:
  - `type` (enum: private/public)
  - `contents` (string[], 必須)

## Entity: BuildArtifact

- **概要**: 公開サイトに出力する静的ファイル。
- **主要フィールド**:
  - `path` (string, 必須)
  - `checksum` (string, optional)

## 検証ルール

- `published: true` の場合は `publishedAt` を必須とする
- `slug` は英小文字とハイフンのみを許可する
- `tags` は重複禁止
- `category` は 1 つのみ

## 状態遷移

- Draft (`published: false`) → Published (`published: true`, `publishedAt` 設定)
- Published → Unpublished (`published: false`, `publishedAt` 유지、履歴として保持)

## 補足

- 実体は Markdown ファイルとフロントマターで管理する。