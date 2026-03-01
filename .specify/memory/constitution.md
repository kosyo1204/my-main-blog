<!--
Sync Impact Report
- Version change: 1.0.1 -> 1.1.0
- Modified principles: none
- Added sections: none
- Removed sections: none
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
- Follow-up TODOs:
	- TODO(COMMAND_TEMPLATES): .specify/templates/commands/ is missing; verify if command templates are required.
-->

# my-main-blog Constitution

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)

テスト駆動開発（TDD）はコード品質の基盤です。すべての新機能・バグ修正は以下のサイクルを厳密に従います：

1. **テスト作成** — ユーザーの期待動作に基づいて実装前にテストを記述（Red Phase）
2. **ユーザー承認** — テストが本当にユーザーの要件を満たすか確認
3. **実装** — テストが失敗する実装を書く（Green Phase）
4. **リファクタリング** — コードを改善しつつ、すべてのテストを通す（Refactor Phase）

**必須項目**：
- ユニットテスト：各関数・コンポーネントは独立してテスト可能
- インテグレーションテスト：複数の機能やAPI間の連携を検証
- 異なるブラウザ・デバイス上でのテスト（E2E テストも含む）

---

### II. Code Quality and Maintainability

コードはチーム全体で長期間メンテナンスされます。可読性・拡張性・一貫性を優先します：

- **命名規約の厳密性** — 変数名・関数名は機能を明確に反映（日本語コメント可）
- **複数性チェック** — すべての条件分岐・エッジケースを明示的に処理
- **エラーハンドリング** — 例外は適切に捕捉し、ユーザーに分かりやすいメッセージを提示
- **DRY原則** — 重複するロジックは抽象化・共通化
- **モジュール設計** — 1つのモジュール＝1つの責任（Single Responsibility Principle）

**検査基準**：
- Linter / Formatter による自動チェック（ESLint, Prettier など）
- コード複雑度（Cyclomatic Complexity）の監視
- デッドコード・未使用変数の排除

---

### III. User Experience Consistency

すべてのユーザータッチポイントで一貫した体験を提供します：

- **UI/UXデザインシステム** — ボタン、フォーム、色、フォントサイズは統一
- **アクセシビリティ** — 視覚障害・キーボード操作者のために WAI-ARIA 準拠
- **多言語対応** — 日本語をメイン言語とし、将来の多言語化に備えた構造
- **エラーメッセージ** — ユーザーがなぜ失敗したのか、どう対処するか明確に伝える
- **パフォーマンス体感** — ローディング画面、スケルトン UI、プログレスバーで使用感を向上

**チェックリスト**：
- 画面遷移は即座に応答（300ms 以下が目安）
- モバイル・タブレット・デスクトップで レスポンシブに対応
- 検索・フィルタリング結果は 1 秒以内に表示

---

### IV. Performance Requirements

プロダクションサービスは軽量・高速であることが必須です：

- **初期ロード時間** — FCP (First Contentful Paint) ≤ 1.5 秒、LCP (Largest Contentful Paint) ≤ 2.5 秒
- **Core Web Vitals** — Google の計測基準（LCP, FID/INP, CLS）を目安に最適化
- **バンドルサイズ** — メインバンドル < 150 KB (gzip 圧縮後)、全ページの合計 < 500 KB
- **キャッシング戦略** — 静的資産は長期キャッシュ（1 年以上）、ダイナミック コンテンツは適切に無効化
- **データベースクエリ** — N+1 問題を排除、インデックスを活用して応答時間を最小化
- **画像最適化** — WebP フォーマット、レスポンシブ srcset、遅延読込み（Lazy Loading）

**監視指標**：
- 本番環境での継続的パフォーマンス測定
- 定期的な Lighthouse / WebPageTest による診断
- ユーザーセッション分析（Real User Monitoring）

## Language Policy

- **開発言語** — TypeScript / JavaScript（フロントエンド）、Node.js（バックエンド）
- **ドキュメント言語** — 日本語が主言語、国際的な技術ドキュメントは英語
- **コメント** — 日本語で記述し、複雑なロジックは丁寧に説明
- **テスト記述** — Given-When-Then 形式で、日本語でテストシナリオを明記可
- **speckit 出力** — すべての speckit コマンド出力は日本語で記述する

## Development Workflow

- **ブランチ戦略** — docs/git-workflow/BRANCH_STRATEGY.md に従う
- **コミットメッセージ** — docs/git-workflow/COMMIT_CONVENTION.md に従い、日本語でも可（一貫性重視）
- **プルリクエスト** — docs/git-workflow/PR_GUIDELINES.md に従う
- **Code Review** — 最低 1 名以上のレビュー承認を必須（セキュリティ・パフォーマンス観点から）

## Governance

本憲法はプロジェクトのすべての実装・設計決定の上位規範です：

- **適用範囲** — すべての本番コード、テスト、ドキュメントに適用
- **PR チェック** — 各プルリクエストは本憲法の 4 つの原則（TDD、Code Quality、UX Consistency、Performance）に対して検証されます
- **違反の対処** — 原則違反が見つかった場合、PR はマージ前に修正を必須とします
- **版管理** — 本憲法の改正は Semantic Versioning に従い、変更履歴を記録
- **改正手続き** — 大幅な変更は GitHub Issue / Discussion で事前協議、最低 2 名のコア開発者の合意が必須

**Version**: 1.1.0 | **Ratified**: 2026-02-14 | **Last Amended**: 2026-02-15

## speckit 日本語出力ポリシー

すべての speckit コマンド（`/speckit.plan`、`/speckit.spec`、`/speckit.tasks`）の出力は
日本語で生成します。テンプレートの見出し・説明・プレースホルダーも日本語で統一し、
英語が必要な固有名詞は補足として括弧で併記します。

このポリシーにより、生成される実装計画、機能仕様書、タスク一覧がすべて日本語で
出力され、開発プロセス全体が日本語で一貫して進行します。
