# UX要件チェックリスト: Learning Log Blog

**Purpose**: UX/情報設計/アクセシビリティ観点で要求仕様の品質を検証する
**Created**: 2026-02-14
**Feature**: [specs/001-tech-blog/spec.md](specs/001-tech-blog/spec.md)

**Note**: このチェックリストは `/speckit.checklist` により生成されました。

## Requirement Completeness

- [ ] CHK001 公開記事一覧、タグ一覧、カテゴリー一覧の各ページ構成要件は定義されているか？ [Completeness, Spec §User Story 2]
- [ ] CHK002 公開記事詳細に表示すべき情報（タイトル/日付/タグ/カテゴリー/本文）は明示されているか？ [Completeness, Gap]
- [ ] CHK003 公開/非公開切替時の読者向け表示要件は定義されているか？ [Completeness, Spec §Edge Cases]

## Requirement Clarity

- [ ] CHK004 「読みやすい」の基準（文字サイズ/行間/余白/幅など）は定量化されているか？ [Clarity, Spec §FR-007, Gap]
- [ ] CHK005 「3クリック以内」の到達条件は起点と経路が明示されているか？ [Clarity, Spec §SC-002]
- [ ] CHK006 「公開されていない旨が明確」の表示文言や表現ルールは規定されているか？ [Clarity, Spec §Edge Cases, Gap]

## Requirement Consistency

- [ ] CHK007 公開/非公開の定義がユーザーストーリーと機能要件で矛盾していないか？ [Consistency, Spec §User Story 1, Spec §FR-002, Spec §FR-014]
- [ ] CHK008 タグ/カテゴリー導線がユーザーストーリーと機能要件で一貫しているか？ [Consistency, Spec §User Story 2, Spec §FR-006]
- [ ] CHK009 SEO/GA4 の要件が UX 観点で相互に矛盾していないか？ [Consistency, Spec §FR-008, Spec §FR-009]

## Acceptance Criteria Quality

- [ ] CHK010 受け入れシナリオが読者視点の到達性を測定可能にしているか？ [Acceptance Criteria, Spec §User Story 2]
- [ ] CHK011 公開/非公開の受け入れシナリオが UI 表示の差分を明示しているか？ [Acceptance Criteria, Spec §User Story 1]
- [ ] CHK012 エッジケースが UX 影響を測定可能な形で定義されているか？ [Acceptance Criteria, Spec §Edge Cases]

## Scenario Coverage

- [ ] CHK013 初回訪問者がホームから記事に到達する導線要件は定義されているか？ [Coverage, Spec §User Story 2, Gap]
- [ ] CHK014 タグ/カテゴリーが空の場合の表示要件は定義されているか？ [Coverage, Gap]
- [ ] CHK015 公開記事が 0 件の場合の空状態要件は十分に定義されているか？ [Coverage, Spec §Edge Cases]

## Edge Case Coverage

- [ ] CHK016 存在しないタグ/カテゴリーへのアクセス時の表示要件は定義されているか？ [Edge Case, Gap]
- [ ] CHK017 非公開記事の URL 推測時にどの UI を返すか要件化されているか？ [Edge Case, Spec §Edge Cases]
- [ ] CHK018 公開/非公開の切替後に残存ページが表示されないことを UX 要件として記述しているか？ [Edge Case, Spec §Edge Cases]

## Non-Functional Requirements

- [ ] CHK019 キーボード操作やフォーカス可視化の要件は定義されているか？ [Non-Functional, Accessibility, Gap]
- [ ] CHK020 画像やリンクの代替テキスト要件は定義されているか？ [Non-Functional, Accessibility, Gap]
- [ ] CHK021 モバイル表示のブレークポイントと表示ルールは明確か？ [Non-Functional, Spec §FR-007, Gap]
- [ ] CHK022 パフォーマンス指標（FCP/LCP）の UX 影響が要件に反映されているか？ [Non-Functional, Spec §Performance Goals]

## Dependencies & Assumptions

- [ ] CHK023 GA4 の計測スクリプトが UX へ与える影響の取り扱いが要件化されているか？ [Dependencies, Spec §FR-009, Gap]
- [ ] CHK024 baseUrl や公開サイトの URL 設計が導線要件に影響する前提として明記されているか？ [Assumption, Spec §Assumptions, Gap]

## Ambiguities & Conflicts

- [ ] CHK025 「公開記事のみ表示」と「非公開 URL へのアクセス不可」の挙動定義が曖昧になっていないか？ [Ambiguity, Spec §FR-003, Spec §FR-014]
- [ ] CHK026 「公開/非公開の切替」と「古い静的ファイルが残らない」が UX と運用のどちらの責務か明確か？ [Ambiguity, Spec §Edge Cases, Gap]
- [ ] CHK027 タグ/カテゴリーの削除時に「代替表示」がどの状態か明記されているか？ [Ambiguity, Spec §Edge Cases]

## Notes

- 各項目は要求仕様の明確さ・完全性・一貫性を検証する
- [Gap] は仕様に不足がある可能性を示す
- チェック後に必要な追記を spec.md に反映する
