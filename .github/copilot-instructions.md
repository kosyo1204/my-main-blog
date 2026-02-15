# Copilot Instructions

- 回答は必ず日本語でしてください。

## テスト駆動型 CI/CD の自動化

**本番環境（GitHub Pages）で発見された問題は、ユーザー指示なくテスト＋コード修正＋CI統合を自動対応してください**

### 対応フロー

1. 問題をテストスクリプト（`scripts/validate-*.js`）で定義
2. 関連コード修正
3. `package.json` に `npm run test:*` コマンド追加
4. `.github/workflows/deploy-public.yml` にテストステップ追加
5. コミット：`feat: add [test-name] test and fix [issue]`

### ルール

- テスト実行：`npm run test:*` 統一
- CI統合：デプロイ前に配置
- ドキュメント：スクリプト先頭に Purpose, Usage, Expected を記載
