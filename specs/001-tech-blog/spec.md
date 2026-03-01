# Feature Specification: Learning Log Blog

**Feature Branch**: `001-tech-blog`  
**Created**: 2026-02-14  
**Status**: Draft  
**Input**: User description: "学習ログを蓄積し、タグ・カテゴリーで整理し、検索や分類で辿れるブログを作りたい。SEO、モバイル対応、PV/流入元の分析を行い、GitHubで公開できる状態にしたい。"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 読者が記事を探して読む (Priority: P1)

読者として、公開された記事をタグやカテゴリーで辿って目的の記事に到達したい。これにより、内容を検索・参照しやすくなる。

**Why this priority**: 記事の閲覧性と整理が、ポートフォリオとしての価値に直結する最優先機能であるため。

**Independent Test**: 公開記事をタグ/カテゴリー経由で辿れるか、記事詳細が表示されるかで検証できる。

**Acceptance Scenarios**:

1. **Given** タグまたはカテゴリーが付いた公開記事がある, **When** タグ/カテゴリー一覧から選択する, **Then** 対応する公開記事一覧が表示される
2. **Given** 公開記事一覧が表示されている, **When** 記事を選択する, **Then** 記事本文が閲覧できる

---

### User Story 2 - ブログの効果を確認する (Priority: P2)

筆者として、公開記事のPVと流入元を確認したい。これにより、どの記事が見られているか把握し、改善につなげられる。

**Why this priority**: 学習ログの価値を高めるための改善判断に必要だが、公開/非公開の次に重要度が下がるため。

**Independent Test**: 公開記事のPVと流入元が可視化される画面やレポートが表示されるかで検証できる。

**Acceptance Scenarios**:

1. **Given** 公開記事へのアクセスが発生している, **When** 分析ページを開く, **Then** 記事ごとのPVと流入元の概要が確認できる

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- 公開記事が1件もない場合でも、読者に空の状態が分かる表示になる
- 非公開記事のURLが直接入力された場合、公開されていない旨が明確に表示される
- 公開/非公開の切り替え後に古い静的ファイルが残らない
- タグ/カテゴリーが0件の場合は空状態が表示される
- 存在しないタグ/カテゴリーのURLにアクセスした場合は404または空状態が表示される
- タグやカテゴリーが削除されても、記事自体は閲覧可能で代替表示される
- アクセス解析が一時的に取得できない場合、エラーではなく「取得不可」と表示される

## Clarifications

### Session 2026-02-14

- Q: 静的サイトジェネレーター → A: Eleventy (11ty) - JavaScript製、柔軟性高い、学習曲線緩やか、Markdown対応良好
- Q: 公開/非公開の判定方法 → A: フロントマター - Markdown の YAML ヘッダーに `published: true/false` を記述
- Q: 公開リポジトリへのデプロイ方法 → A: GitHub Actions - Private リポジトリの workflow で Public リポジトリへ自動 push
- Q: アクセス解析の実装方法 → A: Google Analytics 4 - 無料、詳細な分析、流入元追跡、業界標準
- Q: 公開サイトのホスティング先 → A: GitHub Pages - 無料、GitHub 統合、将来的に独自ドメイン対応可能（DNS CNAME 設定のみで移行可能）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システムは技術記事を Markdown 形式で作成・編集・保存できること
- **FR-002**: システムは記事にタグを付与・編集・削除できること
- **FR-003**: 読者はタグまたはカテゴリーから記事を絞り込めること
- **FR-004**: システムは記事にカテゴリーを付与・編集・削除できること
- **FR-005**: システムは記事をモバイル端末でも読みやすく表示できること
- **FR-006**: システムは記事に検索エンジン向けの基本情報を含めて公開できること
- **FR-007**: システムは Google Analytics 4 を用いて記事のPVと流入元の概要を確認できること
- **FR-008**: システムはGit管理で公開できる状態を維持できること
- **FR-009**: システムは Eleventy による公開サイトの生成ができること
- **FR-010**: システムは GitHub Actions を用いて生成済みの静的ファイルのみを公開用リポジトリへ自動配置できること
- **FR-011**: システムは GitHub Pages で公開サイトをホスティングできること
- **FR-012**: システムは独自ドメインへの移行を DNS 設定のみで実施できること（将来対応）
- **FR-017**: システムは全文検索を提供する場合、本文も対象に検索できること（任意機能）
- **FR-018**: システムは人気記事ランキングを提供する場合、PV順で表示できること（任意機能）
- **FR-019**: 公開記事詳細にはタイトル、公開日、タグ、カテゴリー、本文を表示すること
- **FR-020**: 公開記事一覧、タグ一覧、カテゴリー一覧は件数0の場合でも空状態メッセージを表示すること（例：「記事がまだありません」）
- **FR-021**: ホームから記事一覧、タグ一覧、カテゴリー一覧への導線を常設ナビゲーションで提供すること
- **FR-022**: 記事本文は最小文字サイズ16px、行間1.6以上、本文幅最大720pxで表示すること
- **FR-023**: すべてのリンクとボタンはキーボード操作で到達でき、フォーカスが視認できること
- **FR-024**: 画像は代替テキストを必須とし、未設定の場合は警告対象とすること
- **FR-025**: 非公開記事へのアクセスまたは存在しないページへのアクセス時は、404ページで「この記事は公開されていません」メッセージを表示すること。ただしタグ/カテゴリーが存在しない場合は空状態ページを表示すること

### Key Entities *(include if feature involves data)*

- **Article**: 記事本文（Markdown）、タイトル、公開状態（フロントマター `published: true/false`）、公開日、タグ、カテゴリー、SEOメタ情報
- **Tag**: 記事を横断して整理するラベル
- **Category**: 記事の主分類
- **AnalyticsSummary**: 記事ごとのPV数、流入元の集計
- **Repository**: Private/Public の区分と格納対象
- **BuildArtifact**: 公開サイトに出力する静的ファイル

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 筆者が新規記事を作成して公開状態まで設定する作業を5分以内で完了できる
- **SC-002**: ホームからタグ/カテゴリー経由で目的の記事詳細に3クリック以内で到達できる
- **SC-003**: 公開記事の閲覧時、モバイルで横スクロールが不要な状態で表示される割合が95%以上
- **SC-004**: 公開記事のPVと流入元の概要を月1回以上確認できる
- **SC-005**: 非公開記事のURLにアクセスしても公開ページが表示されないことが100%確認できる

## Accessibility Policy

**原則**: このプロジェクトは WCAG 2.1 Level AA 準拠をコミットします。

### WAI-ARIA 実装基準

#### Semantic HTML + Role 属性

| シーン | 要素 | Role/属性 | 例 |
|-------|------|-----------|-----|
| ナビゲーション | `<nav>` | `role="navigation"` または `<nav>` 使用 | `<nav role="navigation" aria-label="Main navigation">` |
| ページタイトル | `<h1>` | 各ページに唯一 | ホーム・タグ・記事各ページ |
| 記事本体 | `<article>` | `role="article"` | `<article role="article">` |
| 空状態メッセージ | `<div>` | `role="status"` + `aria-live="polite"` | 検索結果なし時の表示 |
| ページネーション | `<nav>` | `aria-label="Pagination"` | `<nav aria-label="Pagination">` |

#### キーボード操作（FR-023）

- **推奨**: Tab キーで全操作可能（リンク + ボタン）
- **フォーカス可視化**: `:focus-visible` で outline 表示（最小 2px、背景との比率 3:1）
- **スキップリンク**: ロゴからメインコンテンツへの Skip Link を提供

#### フォーム・相互作用

- **ラベル**: `<label for="">` で入力要素と紐付け（検索フォーム等）
- **エラーメッセージ**: `aria-label` または `aria-describedby` で関連付け
- **カウントダウン/ステータス**: `aria-live="polite"` で動的変更を通知

#### 画像・メディア

- **alt 属性**: すべての `<img>` に代替テキスト（装飾画像は alt=""）
- **SVG**: `<title>` + `aria-labelledby` で説明
- **スクリーンリーダー対応**: 背景画像不使用、テキストは `<span>` で提供

#### 色・コントラスト

- **コントラスト比**: 本文 4.5:1、UI部品 3:1（WCAG AA レベル）
- **色バリアント**: 情報を色のみで伝えない（アイコン + テキスト併用）

### 検証方法

1. **自動検証**: axe-core または axe-core を使ったスクリプト（`scripts/validate-a11y.js`）
2. **手動検証**: キーボードナビゲーション (Tab → Enter)、スクリーンリーダー (NVDA/VoiceOver) 簡易確認
3. **CI/CD 検証**: GitHub Actions で axe-core 実行、ARIA 違反があれば fail

### 非準拠の許容範囲

- 第三者 CDN（GA4 スニペット）の ARIA 不備：対象外
- ユーザー提供の画像（alt 補完力）：警告スクリプトで対応（T037）

---

## Assumptions

- 利用者は筆者1名で、複数ユーザー管理は不要
- 公開/非公開は記事単位で Markdown フロントマターで管理する
- ランニングコストは無料を前提とし、有料サービスは避ける
- 公開用リポジトリには静的ファイルのみを配置する
- 静的サイトジェネレーターは Eleventy を使用する
- CI/CD は GitHub Actions を使用する
- アクセス解析は Google Analytics 4 を使用する
- ホスティングは GitHub Pages を使用する（将来的に独自ドメイン対応を想定）
- baseUrl は GitHub Pages と独自ドメインのどちらにも対応できるよう設定値で管理する

## Out of Scope

- コメント機能やSNS連携
- 有料会員向けの限定公開
- 複数筆者による共同編集

## Data Model

記事は以下のFront Matterを持つMarkdownファイルとして管理されます：

```yaml
---
title: "記事タイトル"
date: 2026-02-14
publishedAt: 2026-02-14
published: true
layout: layouts/article
tags:
  - sample
  - tech
category: general
slug: 2026-02-14-sample-post
author: 筆者
---
```

### 主要エンティティ

- **Article**: タイトル、本文（Markdown）、公開状態（`published: true/false`）、公開日（`publishedAt`）、タグ（`tags`配列）、カテゴリー（`category`単数）、スラッグ（`slug`）、レイアウト、著者
- **Tag**: 記事を横断的に整理するラベル（多対多関係）
- **Category**: 記事の主分類（多対一関係）
- **AnalyticsSummary**: 記事ごとのPV数と流入元の集計（Google Analytics 4から取得）

詳細なデータモデル定義は [data-model.md](./data-model.md) を参照してください。

## Performance Requirements

このプロジェクトでは、以下のパフォーマンス目標を設定しています：

### Core Web Vitals

| Metric | Target | Monitoring |
|--------|--------|------------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | Lighthouse CI + GA4 RUM |
| INP (Interaction to Next Paint) | ≤ 200ms | GA4 RUM Events |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | Lighthouse CI |

### Lighthouse スコア

| Category | Target |
|----------|--------|
| Performance | ≥ 85 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 95 |

### バンドルサイズ予算

| Resource | Budget |
|----------|--------|
| HTML | ≤ 50KB |
| CSS (gzip) | ≤ 15KB |
| JS (gzip) | ≤ 10KB |
| Images (homepage) | ≤ 30KB |
| Total (homepage) | ≤ 150KB |

パフォーマンス予算の詳細は以下のドキュメントを参照してください：
- [performance-budget.md](./performance-budget.md) - 予算値と監視スケジュール
- [core-web-vitals.md](./core-web-vitals.md) - Core Web Vitals の詳細と最適化方法

## Security

### Content Security Policy

- 静的サイトのため最小限のCSPを適用
- Google Analytics 4 スクリプトのみ外部リソースとして許可
- XSS、SQLインジェクションなどの一般的な脆弱性は静的サイト生成により自然に回避

### Dependency Management

- Dependabot による依存関係の自動更新を推奨（GitHub リポジトリ設定で管理）
- 週次または月次で依存関係の更新を確認
- npm audit によるセキュリティスキャンをCI/CDに統合可能

### Secrets Management

- GitHub Secrets で GA4 測定IDを管理
- 環境変数: `GA4_MEASUREMENT_ID`
- Private リポジトリに機密情報を保持、Public リポジトリには生成済み静的ファイルのみ配置

## Testing Strategy

### Validation Scripts

本プロジェクトでは、以下のテストスクリプトを用意しています：

**CI/CD で自動実行されるテスト** (`.github/workflows/deploy-public.yml`):
- `npm run test:typography` - タイポグラフィ設定の検証
- `npm run test:slugify` - スラッグ生成の一貫性検証
- `npm run test:published` - Front Matter の `published` フィルター検証
- `npm run test:404` - 404 エラーページの存在確認
- `npm run test:taxonomy` - タグ・カテゴリーページの整合性検証
- `npm run test:link-validation` - 内部リンク切れ検出（pathPrefix対応）
- `npm run test:animations` - アニメーションとマイクロインタラクションの検証
- `npm run test:visual-effects` - ビジュアルエフェクト（シャドウ、背景等）の検証

**手動実行用のテスト**:
- `npm run test:ga4` - Google Analytics 4 実装の確認
- `npm run test:alt-text` - 画像の代替テキスト（alt属性）チェック
- `npm run test:a11y` - アクセシビリティ検証（axe-core使用）
- `npm run test:article-design` - 記事デザインの整合性検証

### E2E Tests (Playwright)

- ナビゲーションテスト（デスクトップ・モバイル）
- ページ遷移の確認
- アクセシビリティ検証
- パフォーマンス予算の確認

テストは Chromium と Firefox の両ブラウザで実行されます。ローカル環境では並列実行、CI環境では `workers: 1` によりシリアル実行されます。

### CI Integration

すべてのテストは以下のワークフローで自動実行されます：
- `.github/workflows/deploy-public.yml` - ビルドとデプロイ前の検証
- `.github/workflows/ci.yml` - Pull Request時の検証

テスト失敗時は CI が失敗し、本番デプロイを防止します。

## Deployment

### GitHub Pages

- **デプロイ先ブランチ**: `gh-pages`
- **ビルドワークフロー**: `.github/workflows/deploy-public.yml`
- **公開URL**: https://kosyo1204.github.io/my-main-blog/

### デプロイワークフロー

1. `master` または `develop` ブランチで開発
2. Pull Request を作成 → CI実行（ビルド・テスト）
   - `master`/`develop` 宛てPR: `.github/workflows/ci.yml` でE2Eテスト実行
   - `develop`/`001-tech-blog` 宛てPR: `.github/workflows/lighthouse-ci.yml` でLighthouseスコア計測
3. `master` ブランチへマージ → `deploy-public.yml` が自動実行
4. `_site/` ディレクトリを `gh-pages` ブランチにデプロイ
5. GitHub Pages が自動的に公開

### 将来の拡張

以下の機能拡張を計画しています：

- **独自ドメイン設定** - DNS CNAME 設定のみで移行可能（Phase 1 想定）
- **Cloudflare CDN 統合** - キャッシュとパフォーマンス最適化
- **継続的なパフォーマンス監視** - Lighthouse CI の自動実行
- **A/Bテスト基盤** - 記事レイアウトの最適化

## Contribution Guidelines

プルリクエストを作成する際は、以下のチェックリストを確認してください：

### Pull Request Checklist

- [ ] すべてのテストが通過している（`npm run test:*`）
- [ ] Lighthouse スコアが予算内に収まっている
- [ ] コミットメッセージが Conventional Commits 準拠（日本語）
- [ ] ドキュメントの更新（必要に応じて）
- [ ] コードスタイルが統一されている
- [ ] アクセシビリティ基準（WCAG 2.1 Level AA）を満たしている

詳細なコントリビューションガイドラインは [CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

### コミットメッセージ形式

```
{type}({scope}): {description}
```

例：
- `feat(記事): 新規投稿機能を実装`
- `fix(UI): レスポンシブデザインを修正`
- `docs(README): セットアップ手順を追加`

### ブランチ戦略

このプロジェクトでは以下のブランチ戦略を採用しています：

- **master**: 本番環境（デプロイ用）
- **develop**: 開発統合ブランチ
- **feature/{name}**: 新機能開発
- **hotfix/{name}**: 緊急修正

※ 注意: CONTRIBUTING.md では本番ブランチを `main` と記載していますが、実際のワークフロー（`.github/workflows/*.yml`）では `master` を使用しています。今後の移行を検討中です。
