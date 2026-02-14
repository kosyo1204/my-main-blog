# 貢献ガイドライン（CONTRIBUTING）

## コミットメッセージ規約

このプロジェクトでは、コミットメッセージを日本語で記載します。以下の形式に従ってください。

### フォーマット

```
{type}({scope}): {description}

{body}

{footer}
```

### Type（必須）

以下のいずれかを選択してください：

| Type | 説明 | 例 |
|------|------|-----|
| **feat** | 新しい機能の追加 | feat(記事): 記事投稿機能を実装 |
| **fix** | バグ修正 | fix(検索): 検索結果のソート順序を修正 |
| **docs** | ドキュメントの追加・更新 | docs(README): セットアップ手順を追加 |
| **style** | コードのスタイル変更（機能に影響なし） | style(コンポーネント): インデント調整 |
| **refactor** | コードのリファクタリング | refactor(API): API呼び出し処理を統合 |
| **perf** | パフォーマンス改善 | perf(記事一覧): ページネーション実装で読込速度改善 |
| **test** | テストの追加・更新 | test(ユーティリティ): 日付変換関数のテストを追加 |
| **chore** | ビルドツール・依存関係の更新など | chore(依存関係): Express を 4.17.1 にアップデート |

### Scope（推奨）

変更の対象範囲を括弧内に記載します。例：

- `feat(記事)`: 記事機能に関する変更
- `fix(UI)`: UIコンポーネントの修正
- `docs(API)`: APIドキュメント
- `chore(依存関係)`: パッケージ更新

### Description（必須）

変更内容を日本語で簡潔に説明します。

- 命令形で記載（「〜する」）
- 先頭は小文字で開始
- 句点（。）は不要
- 50文字以内が目安

**良い例：**
```
feat(タグ): タグ管理機能を実装
fix(検索): キーワード検索時のエラーを修正
docs(セットアップ): インストール手順を追加
```

**悪い例：**
```
Update                    （内容が不明確）
fixed some bugs           （英語）
機能実装しました。        （句点がある、曖昧）
```

### Body（任意）

- 「なぜ」この変更が必要なのかを説明
- 複数行の場合は72文字で折り返し
- 詳細な変更内容を記載

### Footer（任意）

- Issue番号の参照: `Fixes #123`
- Breaking Change の記載: `BREAKING CHANGE: 〜`

### コミットメッセージの例

#### 例1：シンプルなコミット
```
feat(記事): 記事投稿機能を実装
```

#### 例2：詳細説明付き
```
feat(記事): 公開/非公開の切り替え機能を実装

ユーザーが投稿時に記事の公開状態を選択できるようにしました。
デフォルトは非公開で、ユーザーが明示的に公開を選択した場合のみ公開されます。

Fixes #15
```

#### 例3：修正コミット
```
fix(検索): 日本語キーワード検索のバグを修正

検索フィルタリング時に正規表現がマッチしていないバグを修正。
マルチバイト文字対応のため正規表現フラグを追加。
```

---

## Git フロー（ブランチ戦略）

このプロジェクトは **Git flow** を採用しています。

### ブランチ構成

| ブランチ | 用途 | ベース |
|---------|------|--------|
| **main** | 本番環境・リリース | 安定版のみ |
| **develop** | 開発の統合ブランチ | 新機能の統合 |
| **feature/{name}** | 新機能開発 | develop から分岐 |
| **release/{version}** | リリース前の準備 | develop から分岐 |
| **hotfix/{name}** | 本番環境の緊急修正 | main から分岐 |

### ワークフロー

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

### リリーズの手順

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

## Pull Request ガイドライン

1. **ブランチ名は明確に** — 変更内容が一目でわかる名前
2. **説明を記載** — なぜこの変更が必要か、何を変更したか
3. **小粒度の PR** — 複数機能の混在は避ける
4. **テストを追加** — テスト可能な機能にはテストコードを含める

---

## その他のルール

- **直接プッシュ禁止** — main と develop への直接プッシュはブランチ保護ルールで制限
- **必ずプルリクエスト経由でマージ** — レビュープロセスを必須化
- **定期的な同期** — develop の最新状態を feature ブランチに反映

質問や不明な点があれば、Issue で相談してください。

