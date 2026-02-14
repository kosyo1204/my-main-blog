# ブランチ戦略

このプロジェクトは **Git flow** を採用しています。

---

## ブランチ構成

| ブランチ | 用途 | ベース |
|---------|------|--------|
| **main** | 本番環境・リリース | 安定版のみ |
| **develop** | 開発の統合ブランチ | 新機能の統合 |
| **feature/{name}** | 新機能開発 | develop から分岐 |
| **release/{version}** | リリース前の準備 | develop から分岐 |
| **hotfix/{name}** | 本番環境の緊急修正 | main から分岐 |

---

## ワークフロー図

```
main      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │                    ↑
          │         release/v1.1.0
          │         ↑            │
          │         │            ↓
develop   ━━━━━━━┃━━━━━━━━━━━━━┃━━━━━━━━
          ↑       ↑             ↓
          │       │     hotfix/bug-fix
          │       │     ↑       │
          │       ↓     │       ↓
          ├─feature/add-tag
          │       ↑
          │       │
          ├─feature/seo-optimize
                  ↑
```

---

## ワークフロー

### 新機能開発の手順

1. **develop ブランチを最新に更新**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **feature ブランチを作成**
   ```bash
   git checkout -b feature/記事検索機能
   ```

3. **機能を実装し、コミット**
   ```bash
   git add .
   git commit -m "feat(検索): 全文検索機能を実装"
   ```

4. **develop にプッシュ**
   ```bash
   git push origin feature/記事検索機能
   ```

5. **GitHub で Pull Request を作成** （develop へ）

6. **レビュー後、develop にマージ**

---

### リリースの手順

1. **release ブランチを作成**
   ```bash
   git checkout -b release/v1.0.0 develop
   ```

2. **バージョン番号や最終調整**
   ```bash
   git commit -m "chore(リリース): v1.0.0 の準備"
   ```

3. **main と develop にマージ**
   ```bash
   git checkout main
   git merge --no-ff release/v1.0.0
   git tag -a v1.0.0 -m "v1.0.0"
   
   git checkout develop
   git merge --no-ff release/v1.0.0
   ```

4. **release ブランチ削除**
   ```bash
   git branch -d release/v1.0.0
   ```

---

### 緊急修正（Hotfix）の手順

1. **hotfix ブランチを作成**
   ```bash
   git checkout -b hotfix/重大なバグ修正 main
   ```

2. **修正をコミット**
   ```bash
   git commit -m "fix(セキュリティ): XSS脆弱性を修正"
   ```

3. **main と develop にマージ**
   ```bash
   git checkout main
   git merge --no-ff hotfix/重大なバグ修正
   git tag -a v1.0.1 -m "v1.0.1"
   
   git checkout develop
   git merge --no-ff hotfix/重大なバグ修正
   ```

4. **hotfix ブランチ削除**
   ```bash
   git branch -d hotfix/重大なバグ修正
   ```

---

## ブランチ命名規約

- **feature ブランチ**
  - 形式：`feature/{機能名}`
  - 例：`feature/add-tag`, `feature/seo-optimize`, `feature/analytics`

- **release ブランチ**
  - 形式：`release/v{バージョン}`
  - 例：`release/v1.0.0`, `release/v1.1.0`

- **hotfix ブランチ**
  - 形式：`hotfix/{修正内容}`
  - 例：`hotfix/security-patch`, `hotfix/db-connection-bug`

---

## ルール

- **直接プッシュ禁止** — main と develop への直接プッシュはブランチ保護ルールで制限
- **必ずプルリクエスト経由でマージ** — レビュープロセスを必須化
- **定期的な同期** — develop の最新状態を feature ブランチに反映

---

## 参照

- [コミットメッセージ規約](COMMIT_CONVENTION.md)
- [Pull Request ガイドライン](PR_GUIDELINES.md)
- [Git ワークフロー](README.md)
