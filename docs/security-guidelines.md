# セキュリティガイドライン

このドキュメントは、リポジトリのセキュリティベストプラクティスを定義します。

## GitHub Actions のセキュリティ

### サードパーティアクションのピン留め

**原則**: 特権的な権限を持つサードパーティアクションは、コミット SHA で不変参照にピン留めする必要があります。

#### 理由

- **サプライチェーンリスクの低減**: バージョンタグ（例: `@v3`）は変更可能であり、アクションリポジトリが侵害された場合、タグが悪意あるコードを指すように更新される可能性があります
- **再現性の保証**: コミット SHA は不変であり、特定のコードバージョンを確実に参照できます
- **権限の保護**: `contents: write`, `pages: write` などの強力な権限を持つアクションは特に重要です

#### 実装例

```yaml
# ❌ 非推奨: バージョンタグのみでピン留め
- uses: peaceiris/actions-gh-pages@v3

# ✅ 推奨: コミット SHA でピン留め（参照情報付き）
# peaceiris/actions-gh-pages@v3.9.3 (2023-03-30)
# Ref: https://github.com/peaceiris/actions-gh-pages/releases/tag/v3.9.3
- uses: peaceiris/actions-gh-pages@884a022ae1324d3c237eda2f031bf38156050999
```

#### 対象アクション

以下のような場合は必ずコミット SHA でピン留めしてください：

1. **サードパーティアクション**（`actions/*` 以外）で以下のいずれかに該当する場合：
   - `contents: write` 権限を使用
   - `pages: write` 権限を使用
   - シークレットやトークンにアクセス
   - デプロイやリリースを実行

2. **公式 GitHub アクション**（`actions/*`）は、通常バージョンタグでも問題ありませんが、SHA ピン留めも推奨されます

#### メンテナンス

- 定期的に使用しているアクションのセキュリティアップデートを確認
- 新しいバージョンに更新する際は、新しいコミット SHA に更新
- コメントに元のバージョンタグとリリース日を記載して追跡可能にする

### 参考リンク

- [GitHub Actions のセキュリティ強化](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)
- [サードパーティアクションの使用](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions)

## 適用状況

### Deploy Workflow (.github/workflows/deploy-public.yml)

- ✅ `peaceiris/actions-gh-pages`: コミット SHA でピン留め済み (v3.9.3 → 884a022)

---

最終更新: 2026-03-05
