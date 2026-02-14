# 貢献ガイドライン（CONTRIBUTING）

このプロジェクトへの貢献を歓迎します。以下のドキュメントを参照して、開発に参加してください。

---

## 📋 Git 運用ドキュメント

Git ワークフロー・コミットメッセージ規約・ブランチ戦略については、以下のドキュメントを参照してください：

### [docs/git-workflow/](docs/git-workflow/)

- **[README](docs/git-workflow/README.md)** — Git 運用全体の概要
- **[COMMIT_CONVENTION.md](docs/git-workflow/COMMIT_CONVENTION.md)** — コミットメッセージ規約
- **[BRANCH_STRATEGY.md](docs/git-workflow/BRANCH_STRATEGY.md)** — ブランチ戦略・ワークフロー
- **[PR_GUIDELINES.md](docs/git-workflow/PR_GUIDELINES.md)** — Pull Request ガイドライン

---

## 🚀 クイックスタート

### 新機能を開発する場合

```bash
git checkout develop
git pull origin develop
git checkout -b feature/機能名
git add .
git commit -m "feat(スコープ): 説明"
git push origin feature/機能名
```

GitHub で Pull Request を作成してください。

---

## 📚 その他のリソース

- [プロジェクト概要](README.md)
- [要件定義](docs/requirements/REQUIREMENTS.md)

---

質問や不明な点があれば、Issue で相談してください。

