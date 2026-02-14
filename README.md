# my-main-blog

技術学習のログを蓄積・公開するブログプラットフォーム

---

## URL

（後日追加予定）

---

## Repositories

- **Main Repository**: https://github.com/[user]/my-main-blog
- **関連リポジトリ**: なし

---

## Tech Stack

<!-- AUTO-GENERATED:TECH_STACK:START -->
**Runtime / Dependencies**
- なし

**Dev Dependencies**
- @11ty/eleventy
- @11ty/eleventy-img
- prettier
- sharp
<!-- AUTO-GENERATED:TECH_STACK:END -->

---

## Requirements

### 目的
- 学習ログを継続的に蓄積する
- 知識を整理し、後から検索・参照できるようにする
- 転職活動のポートフォリオとして活用できる状態にする

### 想定利用者
- 主な利用者：筆者本人
- 副次的な利用者：採用担当者 / エンジニア

### 主要機能
| 機能 | ステータス |
|------|----------|
| 公開記事の閲覧 | 必須 |
| 公開/非公開の切り替え | 必須 |
| タグ・カテゴリー分類 | 必須 |
| SEO 最適化 | 必須 |
| モバイル最適化 | 必須 |
| アクセス解析（PV + 流入元） | 必須 |
| 全文検索 | 任意 |
| 人気記事ランキング | 任意 |

**詳細は** [docs/requirements/REQUIREMENTS.md](docs/requirements/REQUIREMENTS.md) **を参照してください。**

---

## Setup

### 前提条件
- Node.js v16+ （またはプロジェクトで指定されたバージョン）
- npm / yarn

### インストール
```bash
# リポジトリをクローン
git clone https://github.com/[user]/my-main-blog.git
cd my-main-blog

# 依存パッケージをインストール
npm install
# または
yarn install
```

### 開発サーバーの起動
<!-- AUTO-GENERATED:DEV_CMD:START -->
```bash
npm run dev
```
<!-- AUTO-GENERATED:DEV_CMD:END -->

### Docker 開発
Docker での開発手順は [docs/docker/README.md](docs/docker/README.md) を参照してください。

### ビルド
<!-- AUTO-GENERATED:BUILD_CMD:START -->
```bash
npm run build
```
<!-- AUTO-GENERATED:BUILD_CMD:END -->

---

## Documentation Guide

ドキュメントは `docs/` 配下に整理しています。用途に応じて以下を参照してください。

<!-- AUTO-GENERATED:DOCS_GUIDE:START -->
- [docs/requirements/REQUIREMENTS.md](requirements/REQUIREMENTS.md) — 要件定義
- [docs/docker/README.md](docker/README.md) — Docker 開発ガイド
- [docs/git-workflow/README.md](git-workflow/README.md) — Git 運用ガイド
- [docs/design/IMAGE_OPTIMIZATION.md](design/IMAGE_OPTIMIZATION.md) — 画像最適化ガイド
- [README.md](git-workflow/README.md) — Git 運用の全体概要
- [COMMIT_CONVENTION.md](git-workflow/COMMIT_CONVENTION.md) — コミットメッセージ規約
- [BRANCH_STRATEGY.md](git-workflow/BRANCH_STRATEGY.md) — ブランチ戦略とワークフロー
- [PR_GUIDELINES.md](git-workflow/PR_GUIDELINES.md) — Pull Request ガイドライン
- [REQUIREMENTS.md](requirements/REQUIREMENTS.md) — 詳細な要件定義・仕様書
- [README.md](docker/README.md) — Docker 開発ガイド
- [IMAGE_OPTIMIZATION.md](design/IMAGE_OPTIMIZATION.md) — 画像最適化ガイド（Eleventy）
- [docs/design/](design/IMAGE_OPTIMIZATION.md) — 設計ドキュメント
- [docs/testing/](testing/) — テスト戦略・テストガイドライン
- [docs/deployment/](deployment/) — デプロイメントガイド
- [ルート README](../README.md)
- [Git 運用ガイド](git-workflow/README.md)
<!-- AUTO-GENERATED:DOCS_GUIDE:END -->

---

## 開発に参加する際は

Git ワークフロー・コミットメッセージ規約・ブランチ戦略については、[docs/git-workflow/](docs/git-workflow/) を参照してください。
