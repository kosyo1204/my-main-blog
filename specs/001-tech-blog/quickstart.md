# クイックスタート: Learning Log Blog

## 前提条件

- Node.js 20 LTS
- Git（Private/Public リポジトリへのアクセス）

## セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

- http://localhost:8080 で確認

## ビルド

```bash
npm run build
```

- 出力先は `_site/`

## デプロイ（GitHub Actions）

Public リポジトリへ成果物を同期するため、Private リポジトリに以下のシークレットを設定する。

- `PUBLIC_REPO_URL`: Public リポジトリの URL
- `PUBLIC_REPO_BRANCH`: 公開ブランチ（例: main）
- `DEPLOY_KEY`: Public リポジトリへの push 権限を持つ SSH キー
- `GA4_MEASUREMENT_ID`: Google Analytics 4 の測定 ID

## 記事メタデータ管理ガイド

### フロントマター形式

記事の Markdown ファイルの先頭に YAML フロントマターで以下の情報を指定します。

```yaml
---
title: "記事タイトル"
published: true  # true: 公開、false: 非公開
publishedAt: 2026-02-14
tags:
  - JavaScript
  - Eleventy
category: "技術"
seoTitle: "SEO用タイトル（省略時はtitleを使用）"
seoDescription: "SEO用説明（120文字以内推奨）"
---
```

### フロントマター仕様

| キー | 型 | 必須? | 説明 |
|------|-----|--------|-------|
| `title` | string | ✅ | 記事タイトル |
| `published` | boolean | ✅ | `true`: 公開、`false`: 非公開 |
| `publishedAt` | date | ✅ | 公開日（published=true の場合は必須） |
| `tags` | array | ❌ | タグ配列（英小文字、ハイフン可） |
| `category` | string | ❌ | カテゴリー（英小文字、ハイフン可） |
| `seoTitle` | string | ❌ | SEO用タイトル（50-60文字推奨） |
| `seoDescription` | string | ❌ | SEO用説明（120-160文字推奨） |

### タグ・カテゴリー運用

**タグの追加・編集・削除手順**:

1. 記事のフロントマターの `tags: ` フィールドを編集
   ```yaml
   tags:
     - "新しいタグ"  # 追加
       # - "削除するタグ" （コメントアウト又は削除）
   ```
2. `npm run build && npm run test:taxonomy` を実行し、タグ一覧ページが正常に生成されるか確認
3. Git にコミット・プッシュ

**カテゴリーの追加・編集・削除手順**:

1. 記事のフロントマターの `category:` フィールドを編集
   ```yaml
   category: "新カテゴリー"
   ```
2. `npm run build && npm run test:taxonomy` を実行し、カテゴリー一覧ページが正常に生成されるか確認
3. Git にコミット・プッシュ

**注意**:
- タグは複数付く可能性があります
- カテゴリーは記事ごとに1つのみ指定
- タグ・カテゴリー名は英小文字 + ハイフン のみを使用（スペース・アンダースコア不可）

## 検証コマンド

ビルド前に以下を実行して品質を確認：

```bash
# 公開/非公開フィルタの検証
npm run test:published

# 404 ページの検証
npm run test:404

# タグ/カテゴリーページの生成確認
npm run test:taxonomy

# GA4 計測タグの確認
npm run test:ga4

# 全体テストの実行
npm run test

# コード整形チェック
npm run format:check
```

## 監視・分析

### Lighthouse スコア確認

1. GitHub Actions で自動実行（毎回デプロイ時）
   - Performance ≥ 80/100 が目標
   - Accessibility ≥ 90/100 が目標
   - SEO ≥ 90/100 が目標

2. 手動確認（ローカル）
   ```bash
   npm run build
   # https://lighthouse.io にアクセスし、_site/index.html を指定
   ```

### Google Analytics 4 レポート確認

1. [Google Analytics ダッシュボード](https://analytics.google.com/) にログイン
2. プロパティ: 測定 ID（GA4_MEASUREMENT_ID）
3. レポート > エンゲージメント > ページとスクリーン
   - PV（ページビュー）確認
   - ユーザー流入元分析

## 公開サイト

- GitHub Pages でホスティング
- 将来的に独自ドメインへ移行する場合は DNS の CNAME 設定のみで対応可能
