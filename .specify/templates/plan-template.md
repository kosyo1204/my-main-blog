<!-- ⚠️ OUTPUT LANGUAGE: All content MUST be in 日本語 (Japanese) - required by project constitution -->

# 実装計画: [FEATURE]

**ブランチ**: `[###-feature-name]` | **日時**: [DATE] | **仕様**: [link]
**入力**: 機能仕様書: `/specs/[###-feature-name]/spec.md`

**注記**: このテンプレートは `/speckit.plan` コマンドで生成されます。実行ワークフローについては `.specify/templates/commands/plan.md` を参照してください。

## 概要

[機能仕様書から抽出: 主要な要件 + リサーチからの技術的アプローチ]

## 技術的コンテキスト

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

必須確認項目（my-main-blog Constitution v1.0.0 に基づく）：

- [ ] **I. TDD対応**: テスト計画は Red-Green-Refactor サイクルに従うか？
- [ ] **II. Code Quality**: コードの可読性・保守性・複雑度の管理計画は存在するか？
- [ ] **III. UX Consistency**: UI/UX 一貫性やアクセシビリティの要件は含まれるか？
- [ ] **IV. Performance**: LCP、FCP、バンドルサイズなどの目標値は定義されているか？
- [ ] **Language Policy**: 日本語コメント・多言語対応の方針は明記されているか？

## プロジェクト構造

### ドキュメント（本機能）

```text
specs/[###-feature]/
├── plan.md              # 本ファイル (/speckit.plan コマンド出力)
├── research.md          # フェーズ 0 出力 (/speckit.plan コマンド)
├── data-model.md        # フェーズ 1 出力 (/speckit.plan コマンド)
├── quickstart.md        # フェーズ 1 出力 (/speckit.plan コマンド)
├── contracts/           # フェーズ 1 出力 (/speckit.plan コマンド)
└── tasks.md             # フェーズ 2 出力 (/speckit.tasks コマンド - /speckit.plan では生成されません)
```

### ソースコード（リポジトリルート）
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**構造の決定**: [選択された構造を文書化し、上記の実際のディレクトリを参照してください]

## 複雑性トラッキング

> **憲法チェックに違反があり、正当化が必要な場合のみ入力してください**

| 違反 | 必要な理由 | 却下された簡潔な代案 |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
