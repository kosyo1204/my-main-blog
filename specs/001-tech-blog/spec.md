# Feature Specification: Learning Log Blog

**Feature Branch**: `001-tech-blog`  
**Created**: 2026-02-14  
**Status**: Draft  
**Input**: User description: "学習ログを蓄積し、公開/非公開を切り替え、タグ・カテゴリーで整理し、検索や分類で辿れるブログを作りたい。SEO、モバイル対応、PV/流入元の分析を行い、GitHubで公開できる状態にしたい。公開記事と非公開記事は分離管理し、公開サイトは静的ファイルのみをPublicリポジトリへ出す。"

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

### User Story 1 - 学習ログを公開/非公開で管理する (Priority: P1)

筆者として、技術学習の記事を追加し、公開/非公開を切り替えたい。これにより、学習の蓄積を続けつつ、公開できる内容だけをポートフォリオとして見せられる。

**Why this priority**: 学習ログを蓄積できることと公開/非公開の切り分けが最優先で、他の機能の前提になるため。

**Independent Test**: 記事を新規作成し、公開/非公開を切り替えて公開一覧と公開サイト出力に反映されるかで検証できる。

**Acceptance Scenarios**:

1. **Given** 記事が未公開で保存されている, **When** 公開に切り替える, **Then** 公開一覧から閲覧できる
2. **Given** 記事が公開されている, **When** 非公開に切り替える, **Then** 公開一覧と公開URLから閲覧できない
3. **Given** 非公開記事が存在する, **When** 公開サイトのビルドを行う, **Then** 非公開記事のページは生成されない

---

### User Story 2 - 読者が記事を探して読む (Priority: P2)

読者として、公開された記事をタグやカテゴリーで辿って目的の記事に到達したい。これにより、内容を検索・参照しやすくなる。

**Why this priority**: 公開記事の閲覧性と整理が、ポートフォリオとしての価値に直結するため。

**Independent Test**: 公開記事をタグ/カテゴリー経由で辿れるか、記事詳細が表示されるかで検証できる。

**Acceptance Scenarios**:

1. **Given** タグまたはカテゴリーが付いた公開記事がある, **When** タグ/カテゴリー一覧から選択する, **Then** 対応する公開記事一覧が表示される
2. **Given** 公開記事一覧が表示されている, **When** 記事を選択する, **Then** 記事本文が閲覧できる

---

### User Story 3 - 公開記事の効果を確認する (Priority: P3)

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

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システムは技術記事を Markdown 形式で作成・編集・保存できること
- **FR-002**: システムは記事ごとに公開/非公開を Markdown フロントマターで切り替えられること
- **FR-003**: システムは公開記事のみを公開一覧に表示できること
- **FR-004**: システムは記事にタグを付与・編集・削除できること
- **FR-005**: システムは記事にカテゴリーを付与・編集・削除できること
- **FR-006**: 読者はタグまたはカテゴリーから公開記事を絞り込めること
- **FR-007**: システムは公開記事をモバイル端末でも読みやすく表示できること
- **FR-008**: システムは公開記事に検索エンジン向けの基本情報を含めて公開できること
- **FR-009**: システムは Google Analytics 4 を用いて公開記事のPVと流入元の概要を確認できること
- **FR-010**: システムはGit管理で公開できる状態を維持できること
- **FR-011**: システムは公開記事と非公開記事を分離して管理できること
- **FR-012**: システムは Eleventy による公開サイトの生成時に公開記事のみをビルド対象にできること
- **FR-013**: システムは GitHub Actions を用いて生成済みの静的ファイルのみを公開用リポジトリへ自動配置できること
- **FR-014**: システムは非公開記事のページを公開サイト上に生成しないこと
- **FR-015**: システムは GitHub Pages で公開サイトをホスティングできること
- **FR-016**: システムは独自ドメインへの移行を DNS 設定のみで実施できること（将来対応）
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

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

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
