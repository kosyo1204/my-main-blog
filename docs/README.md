# Documentation

プロジェクトのドキュメントはこのページから辿れます。

---

## まず読む

- [docs/requirements/REQUIREMENTS.md](requirements/REQUIREMENTS.md) — 要件定義
- [docs/architecture/SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md) — システム構成図
- [docs/architecture/INFRASTRUCTURE.md](architecture/INFRASTRUCTURE.md) — インフラ構成（CI/CD）
- [docs/docker/README.md](docker/README.md) — Docker 開発ガイド
- [docs/git-workflow/README.md](git-workflow/README.md) — Git 運用ガイド
- [docs/design/IMAGE_OPTIMIZATION.md](design/IMAGE_OPTIMIZATION.md) — 画像最適化ガイド
- [docs/performance-budget.md](performance-budget.md) — パフォーマンス予算ガイド
- [docs/security-guidelines.md](security-guidelines.md) — セキュリティガイドライン

---

## 📁 ディレクトリ構成

### [architecture/](architecture/SYSTEM_ARCHITECTURE.md)
システム構成とインフラ構成に関するドキュメント

- [SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md) — システムアーキテクチャ図
- [INFRASTRUCTURE.md](architecture/INFRASTRUCTURE.md) — インフラ構成（CI/CDパイプライン）

### [git-workflow/](git-workflow/README.md)
Git 運用に関するドキュメント

- [README.md](git-workflow/README.md) — Git 運用の全体概要
- [COMMIT_CONVENTION.md](git-workflow/COMMIT_CONVENTION.md) — コミットメッセージ規約
- [BRANCH_STRATEGY.md](git-workflow/BRANCH_STRATEGY.md) — ブランチ戦略とワークフロー
- [PR_GUIDELINES.md](git-workflow/PR_GUIDELINES.md) — Pull Request ガイドライン

### [requirements/](requirements/REQUIREMENTS.md)
プロジェクト要件に関するドキュメント

- [REQUIREMENTS.md](requirements/REQUIREMENTS.md) — 詳細な要件定義・仕様書

### [docker/](docker/README.md)
Docker 開発環境に関するドキュメント

- [README.md](docker/README.md) — Docker 開発ガイド

### [design/](design/IMAGE_OPTIMIZATION.md)
設計・実装方針に関するドキュメント

- [IMAGE_OPTIMIZATION.md](design/IMAGE_OPTIMIZATION.md) — 画像最適化ガイド（Eleventy）

---

## 🚀 今後追加予定のドキュメント

- [docs/design/](design/IMAGE_OPTIMIZATION.md) — 設計ドキュメント
- [docs/testing/](testing/) — テスト戦略・テストガイドライン
- [docs/deployment/](deployment/) — デプロイメントガイド

---

## ドキュメントの追加ルール

- 新規ドキュメントは `docs/` 配下の適切なカテゴリに追加する
- 1トピック1ファイルを基本とし、ファイル名は kebab-case（小文字+ハイフン）で統一する（例: `security-guidelines.md`, `performance-budget.md`）
- サブディレクトリ内のドキュメントは、英大文字+アンダースコアも可（例: `COMMIT_CONVENTION.md`, `REQUIREMENTS.md`）
- 追加後はこの `docs/README.md` にリンクを追記する

---

## 📖 クイックリンク

- [ルート README](../README.md)
- [Git 運用ガイド](git-workflow/README.md)
- [パフォーマンス予算ガイド](performance-budget.md)
