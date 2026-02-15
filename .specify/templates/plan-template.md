# 実装計画: [FEATURE]

**ブランチ**: `[###-feature-name]` | **日付**: [DATE] | **仕様**: [link]
**入力**: `/specs/[###-feature-name]/spec.md` の機能仕様書

**注記**: このテンプレートは `/speckit.plan` コマンドで埋められます。実行フローは
`.specify/templates/commands/plan.md` を参照してください。

## 概要

[機能仕様から抽出: 主要要件 + 調査結果に基づく技術的アプローチ]

## 技術的背景

<!--
  ACTION REQUIRED: このセクションの内容はプレースホルダーです。
  プロジェクトに即した技術情報に置き換えてください。
-->

**言語/バージョン**: [例: Python 3.11, Swift 5.9, Rust 1.75 など または NEEDS CLARIFICATION]  
**主要依存**: [例: FastAPI, UIKit, LLVM など または NEEDS CLARIFICATION]  
**ストレージ**: [該当する場合: PostgreSQL, CoreData, files または N/A]  
**テスト**: [例: pytest, XCTest, cargo test など または NEEDS CLARIFICATION]  
**対象プラットフォーム**: [例: Linux server, iOS 15+, WASM など または NEEDS CLARIFICATION]
**プロジェクト種別**: [single/web/mobile - ソース構成を決定]  
**性能目標**: [ドメイン固有: 1000 req/s, 10k lines/sec, 60 fps など または NEEDS CLARIFICATION]  
**制約**: [ドメイン固有: <200ms p95, <100MB memory, offline-capable など または NEEDS CLARIFICATION]  
**規模/スコープ**: [ドメイン固有: 10k users, 1M LOC, 50 screens など または NEEDS CLARIFICATION]

## 憲法チェック

*GATE: フェーズ0の調査前に必ず通過。フェーズ1の設計後に再確認。*

[憲法ファイルに基づくゲート条件]

## プロジェクト構造

### ドキュメント（本機能）

```text
specs/[###-feature]/
├── plan.md              # このファイル（/speckit.plan 出力）
├── research.md          # フェーズ0出力（/speckit.plan）
├── data-model.md        # フェーズ1出力（/speckit.plan）
├── quickstart.md        # フェーズ1出力（/speckit.plan）
├── contracts/           # フェーズ1出力（/speckit.plan）
└── tasks.md             # フェーズ2出力（/speckit.tasks。/speckit.plan では作成しない）
```

### ソースコード（リポジトリルート）
<!--
  ACTION REQUIRED: このセクションのツリーはプレースホルダーです。
  本機能の実際の構成に置き換え、不要なオプションは削除してください。
  実装計画には Option ラベルを残さないこと。
-->

```text
# [未使用なら削除] オプション1: 単一プロジェクト（DEFAULT）
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [未使用なら削除] オプション2: Web アプリ（"frontend" + "backend" 検出時）
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

# [未使用なら削除] オプション3: モバイル + API（"iOS/Android" 検出時）
api/
└── [backend と同様]

ios/ または android/
└── [プラットフォーム固有構成: 機能モジュール、UI フロー、プラットフォームテスト]
```

**構成決定**: [採用した構成と上記の実パスを明記]

## 複雑性トラッキング

> **憲法チェックに違反があり、正当化が必要な場合のみ記入**

| 違反 | 必要な理由 | 単純案を採用できない理由 |
|-----------|------------|-------------------------------------|
| [例: 4つ目のプロジェクト] | [現状の必要性] | [3つでは不十分な理由] |
| [例: Repository パターン] | [具体的な問題] | [直アクセスでは不十分な理由] |
