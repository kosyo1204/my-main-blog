# 実装計画: Learning Log Blog

**ブランチ**: `001-tech-blog` | **日付**: 2026-02-14 | **仕様**: [specs/001-tech-blog/spec.md](specs/001-tech-blog/spec.md)
**入力**: `/specs/001-tech-blog/spec.md` の機能仕様書

**注記**: このテンプレートは `/speckit.plan` コマンドで埋められます。実行フローは
`.specify/templates/commands/plan.md` を参照してください。

## 概要

Eleventy で Markdown 記事を管理し、静的ビルドして GitHub Pages で公開する。
SEO メタ情報と GA4 を組み込み、モバイル閲覧と検索/分類導線を整備する。

## 技術的背景

**言語/バージョン**: Node.js 20 LTS, JavaScript  
**主要依存**: @11ty/eleventy, @11ty/eleventy-img, sharp, prettier  
**ストレージ**: リポジトリ内ファイル（content/）  
**テスト**: Eleventy のビルド検証（npm run build）、Prettier の整形チェック（追加予定）  
**対象プラットフォーム**: GitHub Actions (ubuntu-latest), GitHub Pages  
**プロジェクト種別**: single（静的サイト）  
**性能目標**: FCP ≤ 1.5s、LCP ≤ 2.5s、メインバンドル < 150KB (gzip)  
**制約**: 無料運用  
**規模/スコープ**: 単一筆者、数百記事規模

## 憲法チェック

*GATE: フェーズ0の調査前に必ず通過。フェーズ1の設計後に再確認。*

- TDD: ビルド検証・整形チェックをテストとして定義し、自動化に含める → 違反なし
- Code Quality: 命名規約・エラーハンドリング・DRY を設計に反映 → 違反なし
- UX Consistency: レスポンシブ・導線・エラー表示を要件化 → 違反なし
- Performance: Core Web Vitals 目標と画像最適化を反映 → 違反なし

**設計後再確認**: Phase 1 設計内容に対して上記ゲートを再評価し、違反なし

## プロジェクト構造

### ドキュメント（本機能）

```text
specs/001-tech-blog/
├── plan.md              # このファイル（/speckit.plan 出力）
├── research.md          # フェーズ0出力（/speckit.plan）
├── data-model.md        # フェーズ1出力（/speckit.plan）
├── quickstart.md        # フェーズ1出力（/speckit.plan）
├── contracts/           # フェーズ1出力（/speckit.plan）
└── tasks.md             # フェーズ2出力（/speckit.tasks。/speckit.plan では作成しない）
```

### ソースコード（リポジトリルート）

```text
content/
├── index.md
├── _includes/
│   └── layouts/
│       └── base.njk
└── articles/
    └── *.md

static/

_site/                 # ビルド成果物（GitHub Pages）
.github/workflows/     # GitHub Actions
```

**構成決定**: 既存の Eleventy 構成（content/ と static/）を基盤にし、_site/ を生成物として GitHub Pages で直接公開する。

## 複雑性トラッキング

> **憲法チェックに違反があり、正当化が必要な場合のみ記入**

違反なし。

## フェーズ計画

### フェーズ0: 調査

- 主要技術（Eleventy/GA4/GitHub Actions/GitHub Pages）と運用方式を調査・決定
- 公開/非公開フィルタリングと公開リポジトリ同期の運用手順を整理

### フェーズ1: 設計

- 記事・タグ・カテゴリー・解析要約などのデータモデルを定義
- ランタイム API が不要であることを契約として明文化
- quickstart にセットアップとデプロイ要件を記載

### フェーズ2: 実装準備

- /speckit.tasks でユーザーストーリー単位のタスク分解を実施
