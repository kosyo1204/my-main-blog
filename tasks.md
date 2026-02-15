# Learning Log Blog - Task Tracking

## Phase 1: Setup（完了 3/3）

- [x] **T001**: Eleventy 設定確認 + npm install
- [x] **T002**: site.json 作成（サイト基本情報）
- [x] **T003**: site.css 作成（基本スタイル）

## Phase 2: Foundation（完了 5/5）

- [x] **T004**: base.njk 共通レイアウト実装
- [x] **T005**: article.njk 記事レイアウト実装
- [x] **T006**: seo.njk SEO メタタグ実装
- [x] **T007**: navigation.json ナビゲーション定義
- [x] **T008**: empty-state.njk 空状態 UI 実装

## Phase 3: US1 - 公開/非公開管理（進行中 6/9）

### Integration Tests
- [x] **T009**: scripts/validate-published.js テスト実装（非公開記事フィルタ検証）
- [x] **T010**: scripts/validate-404.js テスト実装（404ページ検証）

### Implementation
- [x] **T011**: package.json スクリプト追加（test:published, test:404）
- [x] **T012**: eleventyComputed.js 実装（published フィルタ）
- [x] **T013**: ~~コレクション追加（articles）~~ → T014 の一部
- [x] **T014**: ~~ホーム一覧表示~~ → T015 の一部
- [x] **T015**: サンプル記事フロントマター更新（published: true）
- [x] **T016**: 404.md 実装（404ページコンテンツ）

### Pending
- [ ] **T017**: GitHub Actions ワークフロー（deploy-public.yml）
- [ ] **T018**: dateISO フィルター → **完了**（.eleventy.js に実装）

## Phase 4: US2 - 検索・分類（未開始 0/?）

- [ ] T019: コレクション定義（articles, tags, categories）
- [ ] T020: ホーム一覧表示（記事リスト）
- [ ] T021: タグページ実装 (/tags/)
- [ ] T022: カテゴリーページ実装 (/categories/)
- [ ] T023: Google Analytics 4 設定
- [ ] T024: GitHub Actions ワークフロー設定

## Phase 5: Polish（未開始 0/?）

- [ ] T025: CSS ハンドリング（レスポンシブ、アクセシビリティ向上）
- [ ] T026: 404 エラーハンドリング改善
- [ ] T027: ページネーション実装
- [ ] T028: SEO 最適化（sitemap.xml, robots.txt）

## Phase 6: Performance（未開始 0/?）

- [ ] T029: Lighthouse スコア計測
- [ ] T030: Core Web Vitals 最適化
- [ ] T031: 画像最適化設定真の確認
- [ ] T032: バンドルサイズ最適化

## Phase 7: Verification & Deployment（未開始 0/?）

- [ ] T033: E2E テスト実装（Playwright）
- [ ] T034: CI/CD パイプライン設定
- [ ] T035: 本番環境デプロイテスト
- [ ] T036: ロールバック手順確認

---

## Test Results Summary

| テスト | ステータス | 詳細 |
|--------|-----------|-------|
| test:published | ✅ PASS | 公開記事: 1/1 成功 |
| test:404 | ✅ PASS | 404 検証: 4/4 成功 |
| npm run build | ✅ PASS | ビルド成功（3ファイル生成） |

## Git Commit Log

```
35f2897 feat(T012-T016): implement published filter, 404 page, and tests
55a967b docs(tasks): mark Phase 1-2 as complete
15118eb feat(Phase 1-2): implement eleventy layout foundation
269bb8f feat(T002-T003): complete Phase 1 setup
...（以下省略）
```

## Next Action

**T019**: コレクション定義実装開始
- articles コレクション（published: true のみ）
- tags コレクション（タグ一覧）
- categories コレクション（カテゴリー一覧）
