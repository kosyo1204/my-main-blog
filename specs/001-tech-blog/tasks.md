---

description: "Learning Log Blog のタスク進捗"
---

# タスク進捗: Learning Log Blog

**最終更新**: 2026-02-15  
**全体進捗**: 24/48 (50%)

---

## Phase 1: セットアップ（✅ 完了 3/3）

- [x] **T001**: `.eleventy.js` に Eleventy 入出力設定（content/ → _site/）と静的ファイル passthrough を追加
- [x] **T002**: `content/_data/site.json` にサイト基本情報（title/description/baseUrl）を追加
- [x] **T003**: `static/css/site.css` にタイポグラフィとレイアウトの基本スタイルを追加

**ビルド**: ✅ 成功 (`npm run build` → 3ファイル生成)

---

## Phase 2: 基盤（✅ 完了 5/5）

- [x] **T004**: `content/_includes/layouts/base.njk` に共通レイアウト（header/footer/viewport/stylesheet）を実装
- [x] **T005**: `content/_includes/layouts/article.njk` に記事レイアウト（タイトル/日付/本文）を実装
- [x] **T006**: `content/_includes/seo.njk` に SEO メタ（title/description/OG/Twitter）を追加
- [x] **T007**: `content/_data/navigation.json` にナビゲーション定義（home/tags/categories）を追加
- [x] **T008**: `content/_includes/empty-state.njk` に空状態メッセージの共通テンプレートを追加

**ビルド**: ✅ 成功 (`npm run build` → base/article/seo/nav/empty-state テンプレート生成確認)

---

## Phase 3: US1 - 公開/非公開管理（✅ 完了 8/8）

**ゴール**: 記事の公開/非公開をフロントマターで制御

### テスト実装（Integration Tests）
- [x] **T009**: `scripts/validate-published.js` に非公開記事の生成除外チェックを実装
  - ✅ テスト結果: 1/1 成功
- [x] **T010**: `scripts/validate-404.js` に 404 ページの表示文言チェックを実装
  - ✅ テスト結果: 4/4 成功

### 実装
- [x] **T011**: `package.json` に `test:published` と `test:404` スクリプトを追加
- [x] **T012**: `content/_data/eleventyComputed.js` に published フィルタを実装（published=false → permalink=false）
- [x] **T013**: `.eleventy.js` に公開記事のみの `articles` コレクションを追加
- [x] **T014**: `content/index.md` に公開記事一覧を表示（articles コレクション使用）
- [x] **T015**: `content/articles/2026-02-14-sample-post.md` に公開フロントマター（published/tags/category）を追加
- [x] **T016**: `content/404.md` に 404 ページを実装

**ビルド**: ✅ 成功 (`npm run build` → 公開記事のみ _site/ に生成)  
**テスト**: ✅ 全成功
- `npm run test:published` → ✅ 1/1 成功
- `npm run test:404` → ✅ 4/4 成功

---

## Phase 4: US2 - 検索・分類（⏳ 進行中 4/6）

**ゴール**: タグとカテゴリーで記事を探せる

### コレクション定義
- [x] **T019**: `.eleventy.js` に `articles/tags/categories` コレクションを追加
  - ✅ articles: published=true のみ、タグ別ソート対応
  - ✅ tags: すべてのタグを重複排除＋ソート
  - ✅ categories: すべてのカテゴリーを重複排除＋ソート

### ホーム・タグページ実装
- [x] **T020**: `content/index.md` をホーム一覧表示に更新（articles コレクション表示）
- [x] **T021**: `content/tags/` にタグ一覧・タグ別ページを実装
  - ✅ `/tags/` - タグ一覧（tagCount表示）
  - ✅ `/tags/{tag}/` - タグ別記事一覧（ページネーション対応）
- [x] **T022**: `content/categories/` にカテゴリー一覧・カテゴリー別ページを実装
  - ✅ `/categories/` - カテゴリー一覧
  - ✅ `/categories/{category}/` - カテゴリー別記事一覧（ページネーション対応）

### フィルター追加
- [x] **T023-1**: `.eleventy.js` に `tagFilter` フィルターを追加
- [x] **T023-2**: `.eleventy.js` に `slugify` フィルターを追加
- [x] **T024-1**: `.eleventy.js` に `dateISO` フィルターを追加
- [x] **T024-2**: `base.njk` にカテゴリー・タグ別ページのタイトル処理を追加

**ビルド**: ✅ 成功 (`npm run build` → 5ファイル生成: ホーム、タグ一覧、タグ別、カテゴリー一覧、カテゴリー別)

### 残り
- [ ] **T025**: タグ/カテゴリーページの Integration テスト実装（validate-taxonomy.js）
  - 対応: `npm run test:taxonomy`
- [ ] **T026**: GitHub Actions デプロイワークフロー（deploy-public.yml）

**テスト**: ✅ 全継続成功
- `npm run test:published` → ✅ 1/1 成功
- `npm run test:404` → ✅ 4/4 成功

---

## Phase 5: US3 - GA4 計測（⏱️ 未開始 0/6）

**ゴール**: GA4 で PV と流入元を確認できる

- [ ] **T027**: `content/_data/analytics.js` に GA4_MEASUREMENT_ID 読み込みを追加
- [ ] **T028**: `content/_includes/ga4.njk` に GA4 計測スニペットを追加
- [ ] **T029**: `content/_includes/layouts/base.njk` に GA4 条件付き埋め込みを追加
- [ ] **T030**: `scripts/validate-ga4.js` に GA4 計測タグ出力チェックを実装
- [ ] **T031**: `package.json` に `test:ga4` スクリプトを追加
- [ ] **T032**: 環境変数 `GA4_MEASUREMENT_ID` の設定ガイドを追加

---

## Phase 6: Polish - 仕上げ（⏱️ 未開始 0/8）

**ゴール**: CSS、404、ページネーション、SEO 最適化

- [ ] **T033**: CSS ハンドリング（レスポンシブ、アクセシビリティ向上）
- [ ] **T034**: 404 エラーハンドリング改善
- [ ] **T035**: ページネーション実装
- [ ] **T036**: SEO 最適化（sitemap.xml, robots.txt）
- [ ] **T037**: フォーカス可視化強化（outline 3px）
- [ ] **T038**: タイポグラフィ最適化確認（行間 1.6、文字サイズ 16px）
- [ ] **T039**: 画像 alt 属性検証スクリプト（validate-alt-text.js）
- [ ] **T040**: コンテンツ検証（ESLint）

---

## Phase 7: Performance & Monitoring（⏱️ 未開始 0/8）

**ゴール**: Lighthouse CI、Core Web Vitals、定期監査

- [ ] **T041**: Lighthouse CI 統合（Performance ≥ 80）
- [ ] **T042**: Core Web Vitals 定義（LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1）
- [ ] **T043**: GA4 RUM イベント実装（ページロード、INP、CLS 計測）
- [ ] **T044**: axe-core 統合テスト（ARIA 準拠チェック、WCAG AA）
- [ ] **T045**: E2E テスト実装（Playwright: ホーム → タグ → 記事への 3ステップ）
- [ ] **T046**: 月1回の定期監査手順ドキュメント
- [ ] **T047**: パフォーマンス予算定義（performance-budget.md）
- [ ] **T048**: アクセシビリティ監査手順（accessibility-audit.md）

---

## 進捗サマリー

| フェーズ | ステータス | 進捗 | ビルド | テスト |
|---------|-----------|------|--------|--------|
| **Phase 1** | ✅ 完了 | 3/3 | ✅ OK | - |
| **Phase 2** | ✅ 完了 | 5/5 | ✅ OK | - |
| **Phase 3** | ✅ 完了 | 8/8 | ✅ OK | ✅ 5/5 |
| **Phase 4** | ⏳ 進行中 | 4/6 | ✅ OK | ✅ 継続 |
| **Phase 5** | ⏱️ 未開始 | 0/6 | - | - |
| **Phase 6** | ⏱️ 未開始 | 0/8 | - | - |
| **Phase 7** | ⏱️ 未開始 | 0/8 | - | - |
| **総計** | **50% 進行中** | **24/48** | - | - |

---

## Git Commit Log

```
c6de217 feat(T022): implement category pages with pagination
5410c65 feat(T021): implement tag pages with pagination
eb8070c feat(T019-T020): implement collections and home article listing
35f2897 feat(T012-T016): implement published filter, 404 page, and tests
55a967b docs(tasks): mark Phase 1-2 as complete
15118eb feat(Phase 1-2): implement eleventy layout foundation
269bb8f feat(T002-T003): complete Phase 1 setup
```

---

## Next Action

**推奨**: T025-T026 を完了して Phase 4 を終了し、Phase 5 へ移行
- T025: `validate-taxonomy.js` テスト実装
- T026: GitHub Actions デプロイワークフロー設定

**または**: Phase 5 (GA4) 開始
- GA4 計測タグの実装
