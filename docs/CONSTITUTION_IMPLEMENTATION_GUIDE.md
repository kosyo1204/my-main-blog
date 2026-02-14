# 憲法実装ガイド

**my-main-blog 憲法 v1.0.0**  
更新日：2026-02-14

---

## 👤 個人開発での憲法の活用

### 機能を実装する流れ

1. **計画フェーズ** (`/speckit.plan`)
   - ✓ 憲法チェックゲートに合格する
   - ✓ 4つの原則すべてとの整合性を確認
   - 参照：[.specify/templates/plan-template.md](.specify/templates/plan-template.md#Constitution-Check)

2. **仕様フェーズ** (`/speckit.spec`)
   - ✓ 憲法準拠要件（TR-001～TR-013）を追加
   - ✓ ユーザーストーリーの前にテスト戦略を定義
   - 参照：[.specify/templates/spec-template.md](.specify/templates/spec-template.md#Constitution-Compliance-Requirements)

3. **タスク計画フェーズ** (`/speckit.tasks`)
   - ✓ すべてのタスクに分類タグを付ける：[Test]、[Code]、[UX]、[Perf]、[Infra]
   - ✓ 実装の前にテストを書く（レッドフェーズ）
   - ✓ 各ユーザーストーリーの後に憲法チェックポイントを含める
   - 参照：[.specify/templates/tasks-template.md](.specify/templates/tasks-template.md#Task-Categories)

4. **実装フェーズ**
   - ✓ Red-Green-Refactor サイクルに従う（原則 I）
   - ✓ コミット前に ESLint/Prettier を実行（原則 II）
   - ✓ コメントとエラーメッセージに日本語を使用（原則 III）
   - ✓ バンドルサイズとロード時間を監視（原則 IV）

5. **コードレビュー・自己検査フェーズ**
   - ✓ チェック項目：TDD 準拠（テストを先に書いた？テスト合格？）
   - ✓ チェック項目：コード品質（linting 合格？コメント明確？エラーハンドリング完全？）
   - ✓ チェック項目：UX 一貫性（デザインシステム使用？アクセシビリティ確認？日本語メッセージ？）
   - ✓ チェック項目：パフォーマンス（バンドルサイズ OK？ロード時間は目標内？画像最適化？）

---

## 原則 I：テスト駆動開発

### Red-Green-Refactor サイクル

```
1. レッドフェーズ
   └─ ユーザー要件に基づいて失敗するテストを書く
   └─ テストが期待される動作を記述
   └─ 「問題が存在する」ことを確認

2. グリーンフェーズ
   └─ テストに合格するために最小限の実装を書く
   └─ テストが合格する
   └─ コードは非効率または不完全でも良い

3. リファクタリングフェーズ
   └─ テストを合格させながらコード品質を向上
   └─ 重複を排除
   └─ 命名と構造を明確化
   └─ テストが回帰を防ぐ
```

### あなたにとっての意味

- **テストなしでコードを書かない**（譲歩不可！）
- ユニットテスト → 統合テスト → E2E テスト → 実装
- テストファイルが実装ファイルより先に存在
- すべてのエッジケースに明示的なテストがある

### 実装ワークフロー例

```bash
# 1. 失敗するテストを書く（レッドフェーズ）
npm test  # ❌ テスト失敗（予期通り）

# 2. 最小限のコードを書く（グリーンフェーズ）
# ... 機能を実装 ...
npm test  # ✅ テスト合格

# 3. テストを合格させながらリファクタリング（リファクタリング）
# ... コードを改善 ...
npm test  # ✅ 相変わらず合格

# 4. テストと実装をコミット
git add src/feature.ts tests/feature.test.ts
git commit -m "feat: テスト付きで機能を追加"
```

---

## 原則 II：コード品質とメンテナンス性

### 自動チェック

```bash
# すべてのコミット前に実行
npm run lint      # ESLint チェック
npm run format    # Prettier フォーマット
npm run test      # すべてのテスト
```

### コードレビューチェックリスト

- [ ] 関数/メソッドに複雑なロジックを説明する日本語コメントがある
- [ ] 変数名が説明的（例：`userEmail` で `ue` ではない）
- [ ] すべてのエラーパスが処理されている（try-catch、検証チェック）
- [ ] 本番コードに console.log() が残っていない（構造化ロギングを使用）
- [ ] 循環的複雑度 ≤ 10（関数ごと）
- [ ] DRY 原則に従っている（重複ロジックなし）

### 例

```typescript
// ❌ 悪い例：不明な変数名、エラーハンドリングなし
function proc(d) {
  return d.m.map(x => x.p);
}

// ✅ 良い例：明確な名前、エラーハンドリング、日本語コメント
function extractUserPrices(userData) {
  // ユーザーの各商品の価格を抽出
  if (!userData?.members || !Array.isArray(userData.members)) {
    throw new Error('無効なユーザーデータです');
  }
  
  return userData.members.map(member => {
    if (typeof member.price !== 'number') {
      throw new Error(`商品の価格が無効です: ${member.id}`);
    }
    return member.price;
  });
}
```

---

## 原則 III：ユーザー体験の一貫性

### デザインシステムコンポーネント

承認されたデザインシステムコンポーネントのみ使用：
- ボタン、フォーム、カード、モーダル、ダイアログなど
- カラーパレット（プライマリ、セカンダリ、エラー、成功など）
- タイポグラフィ（見出し、本文、キャプション）
- スペーシングとレイアウトグリッド

参照：[デザインシステムドキュメント]（準備中）

### アクセシビリティ（WCAG 2.1 Level AA）

```html
<!-- ❌ 悪い例：アクセシブルでない -->
<div onclick="submit()">クリック</div>

<!-- ✅ 良い例：キーボードアクセス可、スクリーンリーダー対応 -->
<button onClick={submit} aria-label="フォームを送信">
  送信
</button>
```

### 日本語ユーザーメッセージ

```typescript
// ❌ 悪い例：英語のエラーメッセージ
alert('Invalid email format');

// ✅ 良い例：日本語エラーと明確なアクション
alert('メールアドレスが無効です。\nフォーマット例: user@example.com');
```

### レスポンスタイム目標

- ページ遷移：≤ 300ms
- 検索/フィルタ結果：≤ 1000ms
- フォーム送信：ローディングスピナーを表示

---

## 原則 IV：パフォーマンス要件

### パフォーマンス予算

```
✓ First Contentful Paint (FCP)：≤ 1.5秒
✓ Largest Contentful Paint (LCP)：≤ 2.5秒
✓ メインバンドルサイズ：< 150 KB (gzip)
✓ 全ページサイズ：< 500 KB (gzip)
✓ Cumulative Layout Shift (CLS)：< 0.1
✓ Interaction to Next Paint (INP)：< 200ms
```

### 監視ツール

```bash
# Lighthouse 監査を実行
npm run lighthouse

# バンドルサイズを確認
npm run analyze-bundle

# 開発時に監視
npm run dev  # パフォーマンスヒント付き
```

### 一般的な最適化

```typescript
// ❌ 悪い例：画像が遅延読込みされない
<img src="large-banner.png" width="1200" />

// ✅ 良い例：WebP + srcset + 遅延読込み
<picture>
  <source 
    srcSet="banner-mobile.webp 1x, banner-mobile-2x.webp 2x"
    media="(max-width: 768px)"
    type="image/webp"
  />
  <img 
    src="banner-fallback.jpg"
    loading="lazy"
    alt="ページの概要"
  />
</picture>
```

### データベースパフォーマンス

```typescript
// ❌ 悪い例：N+1 クエリ問題
const posts = await Post.find();
for (const post of posts) {
  post.author = await User.findById(post.authorId); // N クエリ！
}

// ✅ 良い例：一括取得（Eager Loading）
const posts = await Post.find().populate('author');
```

---

## 言語ポリシーの実装

### コメント（日本語）

```typescript
/**
 * ユーザー情報を取得します
 * @param userId - ユーザーID
 * @returns ユーザーオブジェクト
 * @throws 無効なID が渡された場合、エラーを投げます
 */
async function getUser(userId: string) {
  // ...
}
```

### エラーメッセージ（日本語）

```typescript
const errors = {
  INVALID_EMAIL: 'メールアドレスが無効です',
  USER_NOT_FOUND: 'ユーザーが見つかりません',
  UNAUTHORIZED: 'このアクションを実行する権限がありません',
  SERVER_ERROR: 'サーバーエラーが発生しました。時間をおいてお試しください'
};
```

### テストシナリオ（Given-When-Then を日本語で）

```typescript
describe('ユーザー登録機能', () => {
  test('有効なメールで登録できる', () => {
    // Given（前提条件）
    const user = { email: 'test@example.com', password: 'Pass123!' };
    
    // When（実行）
    const result = register(user);
    
    // Then（期待結果）
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
  });

  test('無効なメールで登録できない', () => {
    // Given
    const user = { email: 'invalid-email', password: 'Pass123!' };
    
    // When
    const result = register(user);
    
    // Then
    expect(result.success).toBe(false);
    expect(result.error).toBe('無効なメールアドレスです');
  });
});
```

---

## 開発ワークフロー統合

### ブランチ戦略
従う：[docs/git-workflow/BRANCH_STRATEGY.md](docs/git-workflow/BRANCH_STRATEGY.md)

### コミットメッセージ
従う：[docs/git-workflow/COMMIT_CONVENTION.md](docs/git-workflow/COMMIT_CONVENTION.md)

### PR ガイドライン
従う：[docs/git-workflow/PR_GUIDELINES.md](docs/git-workflow/PR_GUIDELINES.md)

### コードレビュー要件
- 最低限の完全性チェック
- 憲法準拠の確認：
  - ✓ TDD：コードの前にテストを書いた？
  - ✓ 品質：Linting、複雑度、エラーハンドリング合格？
  - ✓ UX：デザインシステム、アクセシビリティ、日本語メッセージ OK？
  - ✓ パフォーマンス：バンドルサイズ、ロード時間は目標内？

---

## よくある質問

### Q：コードの後にテストを書いてもいい？
**A**：いいえ。原則 I（TDD）は**譲歩不可**です。テストを先に書く必要があります。これにより、最適化する前に、コードが実際に問題を解決することが確認されます。

### Q：コメントに英語を使ってもいい？
**A**：推奨されません。主言語は日本語です。日本語に明確な訳がない技術用語の場合のみ英語を使用してください。

### Q：パフォーマンス目標が達成不可能な場合？
**A**：PR の説明にブロッカーを文書化してください。パフォーマンス要件は技術的制約に基づいて調整される場合がありますが、ベースラインであるべきです。

### Q：すべての PR でコードレビュー、UX、パフォーマンスが必要？
**A**：はい。すべての PR は4つの原則に対して検証されます。ただし、一部の機能はある原則に大きな焦点を当てる場合があります（例：画像最適化タスクは原則 IV に焦点）。

---

## 緊急時の連絡先 / 質問

憲法要件が不明確であるか達成不可能に思える場合：

1. **GitHub Issue を作成** する（具体的な懸念事項を含める）
2. **含める内容**：機能名、対象の原則、課題の理由
3. **タイムライン**：「constitution-clarification」ラベル付き Issue は1スプリント内に解決

憲法改正には、コア開発者2人の合意 + 文書化が必要です。

---

**最終更新**：2026-02-14  
**憲法バージョン**：1.0.0  
**ドキュメントバージョン**：1.0.0
