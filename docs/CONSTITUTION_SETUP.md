# 📋 my-main-blog 憲法セットアップ完了

**バージョン**: 1.0.0 | **批准日**: 2026-02-14

---

## ✅ セットアップ完了

プロジェクト憲法が確立されました。以下の4つの原則に基づいて開発を進めてください。

---

## 🎯 4つの核となる原則

### I. テスト駆動開発（TDD）✅ 譲歩不可
```
1. テストを先に書く（Red Phase）
2. テストに合格するコードを書く（Green Phase）
3. リファクタリングで改善（Refactor Phase）
```
- Unit、Integration、E2E テスト必須
- テストなしのコード提交は禁止

### II. コード品質とメンテナンス性
- ESLint / Prettier → コミット前に実行
- 循環的複雑度 ≤ 10（関数ごと）
- 複雑な処理は**日本語コメント**で説明
- すべてのエラーパターンに対応

### III. ユーザー体験の一貫性
- UI コンポーネントは設計システムを使用
- アクセシビリティ対応（WCAG 2.1 Level AA）
- **エラーメッセージは日本語**で分かりやすく
- 画面遷移は 300ms 以内

### IV. パフォーマンス要件
- **FCP** ≤ 1.5秒、**LCP** ≤ 2.5秒
- バンドルサイズ < 150 KB (gzip)
- N+1 クエリの排除
- 画像は WebP + 遅延読込み

---

## 📚 参照ドキュメント

### 必須
📄 [.specify/memory/constitution.md](.specify/memory/constitution.md) — 公式憲法（詳細版）

### 開発時に参照
📖 [.specify/CONSTITUTION_IMPLEMENTATION_GUIDE.md](.specify/CONSTITUTION_IMPLEMENTATION_GUIDE.md) — 実装方法＆コード例

### 概要確認
📝 [CONSTITUTION_SUMMARY.md](CONSTITUTION_SUMMARY.md) — 原則の要約

---

## 🛠️ すぐにやること

```bash
# 1. ツール設定を確認
npm run lint           # ESLint チェック
npm run format         # Prettier フォーマット
npm run test           # テスト実行

# 2. パフォーマンスベースライン測定
npm run lighthouse     # Lighthouse 監査

# 3. テストフレームワークの動作確認
npm test               # テストが正常に実行されるか
```

---

## 📝 開発時のチェックリスト

### 新しい機能を実装する前
- [ ] テストを先に書いた？（Red Phase）
- [ ] テストが失敗することを確認した？
- [ ] テストに合格するコードを書いた？（Green Phase）
- [ ] リファクタリングで改善した？（Refactor Phase）

### コミット前
- [ ] `npm run lint` を実行した？
- [ ] `npm run test` ですべてのテストが合格？
- [ ] 複雑な処理に日本語コメントがある？
- [ ] エラーメッセージは日本語？

### パフォーマンス確認（定期的に）
- [ ] `npm run lighthouse` で LCP ≤ 2.5秒？
- [ ] バンドルサイズ < 150 KB (gzip)？
- [ ] 画像は WebP フォーマット＆遅延読込み？

---

## 💡 よくある質問

### Q: テストの後に書いてもいい？
**A**: いいえ。TDD は譲歩不可です。必ずテストを先に書いてください。

### Q: コメントは英語でもいい？
**A**: いいえ。複雑なロジックには日本語コメントを必ず付けてください。

### Q: パフォーマンス目標が達成不可能な場合？
PR の説明で理由をドキュメント化してください（今後の参考に）。

---

## 📂 ファイル構成

```
.specify/
├── memory/
│   ├── constitution.md .............. 公式憲法（詳細）
│   └── SYNC_IMPACT_REPORT.md ....... テンプレート同期レポート
├── CONSTITUTION_IMPLEMENTATION_GUIDE.md ... 実装ガイド
└── templates/
    ├── plan-template.md ........... 更新済（憲法チェック追加）
    ├── spec-template.md ........... 更新済（準拠要件追加）
    └── tasks-template.md .......... 更新済（TDD 強調）
```

---

## 🚀 推奨コミットメッセージ

```
docs: my-main-blog 憲法 v1.0.0 を確立

- 4つの核となる原則を定義：TDD、コード品質、UX一貫性、パフォーマンス
- 言語ポリシー確立（TypeScript、日本語がメイン）
- テンプレート全体を憲法に同期

批准日：2026-02-14
```

---

**今すぐ実装を始めてください！**

次の機能を計画する際は、[CONSTITUTION_IMPLEMENTATION_GUIDE.md](.specify/CONSTITUTION_IMPLEMENTATION_GUIDE.md) を参照してください。
