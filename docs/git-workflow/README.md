# Git ワークフロー

このプロジェクトの Git 運用ルールをまとめています。

---

## 📋 ドキュメント

- [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md) — コミットメッセージの規約
- [BRANCH_STRATEGY.md](BRANCH_STRATEGY.md) — ブランチ戦略とワークフロー
- [PR_GUIDELINES.md](PR_GUIDELINES.md) — Pull Request の作成・レビューガイドライン

---

## ⚡ クイックスタート

### 新機能を開発する場合

```bash
# develop の最新状態を取得
git checkout develop
git pull origin develop

# feature ブランチを作成
git checkout -b feature/記事検索機能

# 実装してコミット
git add .
git commit -m "feat(検索): 全文検索機能を実装"

# origin にプッシュ
git push origin feature/記事検索機能

# GitHub で Pull Request を作成（develop へ）
```

### コミットメッセージの形式

```
{type}({scope}): {description}
```

**例：** `feat(記事): 記事投稿機能を実装`

詳細は [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md) を参照してください。

---

## 🔗 参照

- [ルート README](../../README.md)
- [ドキュメント一覧](../README.md)
