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

（package.json から自動生成予定）

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
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

---

## 開発に参加する際は

Git ワークフロー・コミットメッセージ規約・ブランチ戦略については、[docs/git-workflow/](docs/git-workflow/) を参照してください。
