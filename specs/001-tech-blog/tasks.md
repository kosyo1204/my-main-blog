---

description: "Learning Log Blog のタスクリスト"
---

# タスク一覧: Learning Log Blog

**入力**: `/specs/001-tech-blog/`
**前提条件**: plan.md（必須）、spec.md（必須）、research.md、data-model.md、contracts/、quickstart.md

**テスト**: 憲法の TDD 方針に従い、各ユーザーストーリーにテストタスクを含める。

**構成**: タスクはユーザーストーリーごとにグルーピングし、各ストーリーを独立実装・独立テストできるようにする。

## 形式: `[ID] [P?] [Story] 説明`

- **[P]**: 並列実行可能（異なるファイル、依存なし）
- **[Story]**: 対応するユーザーストーリー（US1, US2, US3）
- 説明には正確なファイルパスを含める

---

## テスト型分類（憲法に基づく TDD 要件）

**原則**: 各ユーザーストーリーは **Unit** → **Integration** → **E2E** テストの 3 階型で独立検証される

| テスト型 | 対象 | ツール | 例 |
|---------|------|--------|-----|
| **Unit** | 個別コンポーネント（フィルタ、ヘルパー） | Node.js ネイティブ、jest | `eleventyComputed.js` の published フィルタ |
| **Integration** | ビルド出力（コレクション生成、ファイル出力） | `node scripts/validate-*.js` | 非公開記事が _site/ に生成されていないか確認 |
| **E2E** | ユーザー導線（ホーム → タグ → 記事詳細） | `npm run build && test-links.js` | 3クリック以内で記事に到達可能か確認 |

**ユーザーストーリーごとの検証**:
- **US1（公開/非公開）**: T009 (Integration), T010 (Integration), + T0XX-T0YY (Unit：permalink),T0ZZ (E2E：404表示)
- **US2（タグ/カテゴリー）**: T018 (Integration), + T0AAA (Unit：tag filter), T0BBB (E2E：ナビゲーション)
- **US3（GA4）**: T028 (Integration), + T0CCC (Unit：GA4 ID), T0DDD (E2E：計測タグ出力)

**新規タスク（テスト層拡充）**:
- [ ] T0XX [P] [US1] scripts/test-permalink.js に eleventyComputed.js の published フィルタ単体テストを実装
- [ ] T0YY [P] [US1] scripts/test-permalink-unit.js を jest で実装（Unit テスト：published=true→URL, published=false→404）
- [ ] T0ZZ [US1] scripts/test-e2e-404.js に E2E テスト（非公開記事にアクセス → 404 ページ表示確認）を実装
- [ ] T0AAA [P] [US2] scripts/test-tag-filter-unit.js を jest で実装（Unit テスト：tag 抽出ロジック）
- [ ] T0BBB [US2] scripts/test-e2e-taxonomy.js に E2E テスト（ホーム → タグ → 記事詳細の導線）を実装
- [ ] T0CCC [P] [US3] scripts/test-ga4-unit.js を jest で実装（Unit テスト：GA4 ID 読み込み）
- [ ] T0DDD [US3] scripts/test-e2e-ga4.js に E2E テスト（GA4 計測タグが全ページに出力）を実装
- [ ] **T0EEE [P] [Core]** scripts/validate-accessibility.js に axe-core 統合テストを実装（ARIA違反 & WCAG AA 準拠チェック）

---

## フェーズ1: セットアップ（共通基盤）

**目的**: プロジェクト初期化と基本構造

- [x] T001 .eleventy.js に Eleventy 入出力設定（content/ → _site/）と静的ファイル passthrough を追加
- [x] T002 [P] content/_data/site.json にサイト基本情報（title/description/baseUrl）を追加
- [x] T003 [P] static/css/site.css にタイポグラフィとレイアウトの基本スタイルを追加

**✅ フェーズ1 完了**: `npm run build` 成功、3 ファイル生成確認

---

## フェーズ2: 基盤（前提条件）

**目的**: すべてのユーザーストーリー実装の前提となる基盤

**⚠️ 重要**: このフェーズが完了するまでユーザーストーリー作業を開始しない

- [x] T004 content/_includes/layouts/base.njk に共通レイアウト（header/footer/viewport/stylesheet）を実装
- [x] T005 [P] content/_includes/layouts/article.njk に記事レイアウト（タイトル/日付/本文/SEO枠）を実装
- [x] T006 [P] content/_includes/seo.njk に SEO メタ（title/description/OG/Twitter）の枠を追加
- [x] T007 [P] content/_data/navigation.json にナビゲーション定義（home/tags/categories）を追加
- [x] T008 [P] content/_includes/empty-state.njk に空状態メッセージの共通テンプレートを追加

**✅ フェーズ2 完了**: `npm run build` 成功、base/article/seo/nav/empty-state テンプレート生成確認

**チェックポイント**: 基盤準備完了。ユーザーストーリーを並行実装可能

---

## フェーズ3: ユーザーストーリー1 - 学習ログを公開/非公開で管理する (優先度: P1) 🎯 MVP

**ゴール**: 記事の公開/非公開をフロントマターで制御し、公開記事のみがサイトに生成される

**独立テスト**: `npm run test:published` と `npm run test:404` を実行し、非公開記事が生成されず 404 が表示される

### テスト（TDD）

- [ ] T009 [P] [US1] scripts/validate-published.js に非公開記事の生成除外チェックを実装
- [ ] T010 [P] [US1] scripts/validate-404.js に 404 ページの表示文言チェックを実装
- [ ] T011 [US1] package.json に `test:published` と `test:404` スクリプトを追加

### 実装

- [ ] T012 [US1] content/_data/eleventyComputed.js に `published: false` の場合 `permalink: false` を設定
- [ ] T013 [US1] .eleventy.js に公開記事のみの `articles` コレクションを追加
- [ ] T014 [US1] content/index.md に公開記事一覧（articles コレクション）を表示し、空状態テンプレートを適用
- [ ] T015 [US1] content/articles/2026-02-14-sample-post.md に公開フロントマター（published/tags/category/seo）を追加
- [ ] T016 [US1] content/404.md に 404 ページ（非公開/存在しない記事用メッセージ）を実装
- [ ] T017 [US1] .github/workflows/deploy-public.yml にビルドと Public リポジトリ同期の GitHub Actions を追加

**チェックポイント**: 公開記事のみが _site/ に生成され、非公開記事は 404 で表示される

---

## フェーズ4: ユーザーストーリー2 - 読者が記事を探して読む (優先度: P2)

**ゴール**: タグとカテゴリーで公開記事を辿り、記事本文へ到達できる

**独立テスト**: `npm run test:taxonomy` を実行し、タグ/カテゴリーページが生成される

### テスト（TDD）

- [ ] T018 [P] [US2] scripts/validate-taxonomy.js にタグ/カテゴリーページの生成チェックを実装
- [ ] T019 [US2] package.json に `test:taxonomy` スクリプトを追加

### 実装

- [ ] T020 [P] [US2] content/_data/tags.js に公開記事からタグ一覧を生成する処理を追加
- [ ] T021 [P] [US2] content/_data/categories.js に公開記事からカテゴリー一覧を生成する処理を追加
- [ ] T022 [US2] content/tags/index.njk にタグ一覧ページを実装し、空状態テンプレートを適用
- [ ] T023 [US2] content/tags/tag.njk にタグ詳細ページ（ページネーション）を実装
- [ ] T024 [US2] content/categories/index.njk にカテゴリー一覧ページを実装し、空状態テンプレートを適用
- [ ] T025 [US2] content/categories/category.njk にカテゴリー詳細ページ（ページネーション）を実装
- [ ] T026 [US2] content/_includes/layouts/article.njk にタグ/カテゴリーのリンク表示を追加
- [ ] T027 [US2] content/_includes/layouts/base.njk に tags/categories へのナビゲーションを追加

**チェックポイント**: タグ/カテゴリーから公開記事へ到達でき、空状態が表示される

---

## フェーズ5: ユーザーストーリー3 - 公開記事の効果を確認する (優先度: P3)

**ゴール**: GA4 を埋め込み、PV と流入元を GA4 で確認できる

**独立テスト**: `npm run test:ga4` を実行し、GA4 計測タグが出力される

### テスト（TDD）

- [ ] T028 [P] [US3] scripts/validate-ga4.js に GA4 計測タグの出力チェックを実装
- [ ] T029 [US3] package.json に `test:ga4` スクリプトを追加

### 実装

- [ ] T030 [P] [US3] content/_data/analytics.js に `GA4_MEASUREMENT_ID` の読み込みを追加
- [ ] T031 [P] [US3] content/_includes/ga4.njk に GA4 スニペットを追加
- [ ] T032 [US3] content/_includes/layouts/base.njk に GA4 部分テンプレートを条件付きで挿入
- [ ] T033 [US3] specs/001-tech-blog/quickstart.md に GA4 レポート確認手順を追記

**チェックポイント**: GA4 による PV/流入元確認が可能

---

## フェーズ6: 仕上げ・横断対応

**目的**: 複数ストーリーに影響する改善

- [ ] T034 [P] static/css/site.css に可読性の改善（文字サイズ16px/行間1.6/本文幅720px）を追加
- [ ] T035 [P] static/css/site.css にフォーカス可視化（outline）を追加
- [ ] T036 [P] content/_includes/seo.njk に SEO 既定値（title/description/OG/Twitter）を追加
- [ ] T037 [P] scripts/validate-alt-text.js に alt 未設定画像の警告チェックを実装
- [ ] T038 package.json に `test` と `format:check` スクリプトを追加
- [ ] T039 specs/001-tech-blog/quickstart.md に検証コマンド（build/test/format）を追記

---

## フェーズ7: 検証・監視（パフォーマンス & アクセシビリティ）

**目的**: 憲法要件（Non-Functional Requirements）の継続監視基盤を構築

**前提**: フェーズ6 完了後、CI/CD パイプラインに統合可能

### テスト（検証スクリプト）

- [ ] T040 [P] scripts/validate-accessibility.js に axe-core を使った ARIA 準拠チェックを実装
- [ ] T041 [P] scripts/test-lighthouse-ci.js に Lighthouse CI 統合設定（Performance/Accessibility/SEO スコア目標）を実装
- [ ] T042 [P] scripts/test-rum-events.js に GA4 RUM イベント（ページロード/INP/CLS）定義を実装

### CI/CD 統合

- [ ] T043 .github/workflows/deploy-public.yml に Lighthouse CI ステップを追加（Performance ≥ 80/100）
- [ ] T044 .github/workflows/deploy-public.yml に axe-core ステップを追加（ARIA 違反で fail）
- [ ] T045 .github/workflows/deploy-public.yml に GA4 RUM イベント埋め込み検証ステップを追加

### ドキュメント

- [ ] T046 specs/001-tech-blog/quickstart.md に「監視・分析」セクションを追加（Lighthouse/GA4 確認手順）
- [ ] T047 docs/performance-budget.md にパフォーマンス予算定義（LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1）を作成
- [ ] T048 docs/accessibility-audit.md に定期監査手順（月1回 axe-core + 手動確認）を作成

**チェックポイント**: CI/CD パイプラインによる自動監視が稼働、月1回の定期監査が定義される

---

### フェーズ依存

- **セットアップ（フェーズ1）**: 依存なし、すぐ着手可能
- **基盤（フェーズ2）**: セットアップ完了が必須、全ストーリーをブロック
- **ユーザーストーリー（フェーズ3-5）**: 基盤完了が必須
- **仕上げ（フェーズ6）**: すべての必要なストーリー完了が必須
- **検証・監視（フェーズ7）**: 仕上げ完了後、CI/CD パイプラインに統合（本運用時に必須）

### ユーザーストーリー依存グラフ

- Setup → Foundational → US1 → US2 → US3 → Polish → Verification

### ユーザーストーリー依存

- **US1（P1）**: 基盤完了後に着手可能、他ストーリーへの依存なし
- **US2（P2）**: 基盤完了後に着手可能、US1 の記事コレクションを利用
- **US3（P3）**: 基盤完了後に着手可能、US1 の公開ビルド前提

### 各ユーザーストーリー内の順序

- テストを先に作成して失敗を確認
- データ/テンプレート → レイアウト → ページの順で実装
- ストーリー完了後に次の優先度へ移行
- フェーズ7（検証・監視）は運用中に段階的に導入可能

---

## 並行例: ユーザーストーリー1

```bash
Task: "scripts/validate-published.js に非公開記事の生成除外チェックを実装"
Task: "content/_data/eleventyComputed.js に permalink 制御を追加"
```

## 並行例: ユーザーストーリー2

```bash
Task: "content/_data/tags.js にタグ一覧生成を追加"
Task: "content/_data/categories.js にカテゴリー一覧生成を追加"
```

## 並行例: ユーザーストーリー3

```bash
Task: "content/_data/analytics.js に GA4 ID 読み込みを追加"
Task: "content/_includes/ga4.njk に GA4 スニペットを追加"
```

---

## 実装戦略

### MVP 優先（ユーザーストーリー1のみ）

1. フェーズ1: セットアップ完了
2. フェーズ2: 基盤完了
3. フェーズ3: US1 完了
4. **停止して検証**: `npm run test:published`、`npm run test:404`、`npm run build` を確認
5. Public リポジトリ同期を動作確認

### 段階的デリバリー

1. セットアップ + 基盤完了
2. US1 追加 → 単独テスト → 公開
3. US2 追加 → 単独テスト → 公開
4. US3 追加 → 単独テスト → 公開
5. 仕上げ対応で全体品質を向上

### 並行チーム戦略

- 基盤完了後、US1/US2/US3 を担当分割して並行実装可能
- [P] タスクは同時実行できる
