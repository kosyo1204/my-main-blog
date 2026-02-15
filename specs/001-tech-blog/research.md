# 調査メモ: Learning Log Blog

## Decision 1: 静的サイトジェネレーター

- Decision: Eleventy (11ty) を採用
- Rationale: Markdown ベースの個人ブログに適合し、学習コストが低く柔軟。既存の repo に依存が存在する。
- Alternatives considered: Hugo（高速だがテーマカスタマイズの自由度が低い）、Astro（新しく運用知見が少ない）、Next.js（SSG には過剰）

## Decision 2: 公開/非公開の判定方法

- Decision: Markdown フロントマターの `published: true/false` を採用
- Rationale: 記事の移動不要で切替が容易。Eleventy のコレクションフィルタと相性が良い。
- Alternatives considered: 公開/非公開のディレクトリ分離、ファイル名プレフィックス

## Decision 3: デプロイ方式（Public リポジトリ連携）

- Decision: GitHub Actions で Private リポジトリから Public リポジトリへ成果物を push
- Rationale: 無料枠で運用でき、GitHub と統合済み。自動化が容易。
- Alternatives considered: 手動スクリプト運用、外部ホスティング（Netlify/Vercel）

## Decision 4: アクセス解析

- Decision: Google Analytics 4 (GA4)
- Rationale: 無料で詳細な PV と流入元が取得でき、静的サイトへの導入が容易。
- Alternatives considered: Plausible（セルフホスト必要）、Cloudflare Web Analytics

## Decision 5: ホスティング

- Decision: GitHub Pages
- Rationale: Public リポジトリの静的ファイル公開が簡単で無料。Actions と親和性が高い。
- Alternatives considered: Netlify、Vercel、Cloudflare Pages

## Decision 6: 実行環境

- Decision: Node.js 20 LTS
- Rationale: 安定した LTS で、Eleventy 2.x と互換性が高い。
- Alternatives considered: Node.js 18 LTS（古くなる）、Node.js 最新版（互換性リスク）

## Decision 7: 公開/非公開の成果物分離

- Decision: Private リポジトリでビルドし、公開成果物のみを Public リポジトリへ同期
- Rationale: Markdown 原本を外部公開せず、公開/非公開の分離要件を満たす。
- Alternatives considered: Public リポジトリで直接ビルド、単一リポジトリで公開/非公開を混在