# Future Roadmap: Learning Log Blog

**最終更新**: 2026-02-15

## 概要

このドキュメントは、現在の MVP（ユーザーストーリー1-3 完了後）に続く将来の拡張機能と改善項目を記載しています。

---

## Phase 1: 独自ドメイン移行（推奨）

**目的**: GitHub Pages から 独自ドメインへ移行し、ブランディング / SEO を強化する

**前提**: MVP（ユーザーストーリー1-3）が完全に運用されていること

### 手順

#### 1️⃣ DNS レジストラでの設定（例: Route 53, Namecheap）

独自ドメイン（例: `myblog.com`）を取得後、DNS レコードを設定します。

**GitHub Pages の IP アドレスに対応する A レコード** を2つ追加：

```txt
RECORD TYPE    NAME         VALUE
A              @            185.199.108.153
A              @            185.199.109.153
A              @            185.199.110.153
A              @            185.199.111.153
CNAME          www          <username>.github.io
```

**設定例（Namecheap）**:

1. Namecheap ダッシュボード > Domain > Manage
2. Advanced DNS タブ
3. A Record × 4 を上記 IP で追加
4. TTL を 3600 に設定

#### 2️⃣ GitHub Pages リポジトリでのカスタムドメイン設定

Public リポジトリ（_site/ 公開用）の Settings で設定：

1. Settings > Pages
2. Custom Domain に独自ドメイン（例: `myblog.com`）を入力
3. "Enforce HTTPS" を **ON** にする
4. Save

#### 3️⃣ baseUrl の更新

spec.md の Assumptions で `baseUrl` が設定可変であることが明記されています。

**Private リポジトリでの作業**:

1. `.eleventy.js` の baseUrl 参照を確認
   ```javascript
   // baseUrl は環境変数またはデータファイルから読み込む
   const baseUrl = process.env.BASE_URL || "https://myblog.com";
   ```

2. `.env` または `content/_data/site.json` で baseUrl を更新
   ```json
   {
     "title": "My Learning Log",
     "baseUrl": "https://myblog.com",
     "description": "..."
   }
   ```

3. GitHub Actions シークレットに `BASE_URL=https://myblog.com` を追加（必要に応じて）

#### 4️⃣ 動作確認

1. 独自ドメイン（例: `https://myblog.com`）にアクセス
2. SSL 証明書が有効（緑色ロック）であることを確認
3. Lighthouse を実行し、パフォーマンス・SEO スコアを確認

**トラブルシューティング**:

| 問題 | 原因 | 対処法 |
|------|------|--------|
| 404 エラー | DNS 設定の反映遅延 | 24-72 時間待機、またはレジストラの DNS キャッシュをクリア |
| リダイレクトループ | baseUrl の不一致 | Google Analytics の baseUrl と一致していることを確認 |
| SSL 証明書エラー | GitHub Pages の自動 HTTPS 設定未完了 | Enforce HTTPS をオフ→オンに切り替えて再設定 |

---

## Phase 2: 検索機能の強化（任意）

**目的**: キーワード検索で公開記事を高速に発見できる

**実装オプション**:

1. **クライアント側検索**（推奨、無料）
   - [Lunr.js](https://lunrjs.com/) または [FlexSearch](https://github.com/nextapps-de/flexsearch) を使用
   - 静的ファイルのみで動作、サーバー不要
   - 記事数が少ないうちは十分（≤ 5000 記事）

2. **Algolia 検索**（有料）
   - セットアップが簡単、高速
   - 無料プランは月1M リクエスト（個人ブログで十分）
   - Eleventy プラグイン対応あり

**推定タスク数**: 8-12 タスク（実装 + テスト）

---

## Phase 3: コメント機能（任意）

**目的**: 読者とのコミュニケーション

**実装オプション**:

1. **Utterances/Giscus** （推奨、無料）
   - GitHub Discussions をバックエンド利用
   - コメント管理が GitHub 上で可能
   - スパム対策：GitHub アカウント必須

2. **Disqus** （有料）
   - 多機能だが、広告が付く（有料で除去）
   - セットアップ簡単

**推定タスク数**: 6-10 タスク

---

## Phase 4: SNS 連携（任意）

**目的**: 公開記事を Twitter / LinkedIn に自動投稿

**実装オプション**:

1. **GitHub Actions + Twitter API**
   - 新規記事を GitHub Actions で検出
   - 自動で Twitter に投稿
   - Hashtag + リンクを含める

2. **IFTTT / Zapier**（ノーコード）
   - GitHub リリース → SNS 投稿のトリガー

**推定タスク数**: 4-8 タスク

---

## Phase 5: パフォーマンス最適化（推奨）

**目的**: Core Web Vitals の進一層改善

**チェックリスト**:

- [ ] 画像最適化：WebP フォーマット変換（@11ty/eleventy-img で自動化）
- [ ] キャッシング戦略：Static Asset `no-cache` → `immutable` に変更
- [ ] CSS / JS の分割・遅延ロード（ページ別）
- [ ] RSS フィード生成（記事更新の通知用）

**推定タスク数**: 6-8 タスク

---

## Phase 6: アクセシビリティ監査（推奨）

**目的**: WCAG 2.1 AA から AAA へ段階的に引き上げる

**チェックリスト**:

- [ ] 月次 axe-core 自動監査の実行と結果保存
- [ ] 四半期ごとの手動キーボード・スクリーンリーダー監査
- [ ] アクセシビリティポリシーの公開（users/privacy 等に掲載）
- [ ] ユーザーからのアクセシビリティ改善提案の受付窓口設置

**推定タスク数**: 4-6 タスク

---

## Phase 7: 分析・メトリクス化（推奨）

**目的**: 記事パフォーマンスの継続監視

**実装項目**:

- [ ] GA4 カスタムイベント：記事別スクロール深さ、読了時間
- [ ] Core Web Vitals の月次レポート（Lighthouse CI から自動生成）
- [ ] 人気記事ランキングダッシュボード（Sheets / Data Studio 連携）
- [ ] リファラー分析：どのサイト / SNS から流入が多いか

**推定タスク数**: 8-12 タスク

---

## Phase 8: リデザイン（オプション）

**目的**: UX/UI の大型改善

**考慮事項**:

- レスポンシブリデザイン（タビレット / 大画面最適化）
- ダークモード対応
- テーマカスタマイズ（読者が配色選択可能）

**推定タスク数**: 12-20 タスク（スコープによる）

---

## 優先度マトリックス

| フェーズ | 優先度 | 投資対効果 | タスク数 | 推定実装期間 |
|---------|--------|----------|--------|----------|
| **Phase 1: 独自ドメイン** | 🔴 高 | 高（SEO） | 4 | 1 週間 |
| **Phase 2: 検索機能** | 🟠 中-高 | 中 | 10 | 1-2 週間 |
| **Phase 5: パフォーマンス最適化** | 🔴 高 | 高（Core Web Vitals） | 8 | 1 週間 |
| **Phase 6: アクセシビリティ監査** | 🟠 中 | 中（コンプライアンス） | 5 | 1 週間 |
| **Phase 7: 分析メトリクス** | 🟠 中 | 中 | 10 | 2 週間 |
| Phase 3: コメント機能 | 🟡 低-中 | 低 | 8 | 1 週間 |
| Phase 4: SNS 連携 | 🟡 低-中 | 低 | 6 | 1 週間 |
| Phase 8: リデザイン | 🟡 低 | 低 | 15+ | 3-4 週間 |

---

## 推奨実施順序（最短パス）

1. **Phase 1: 独自ドメイン** → SEO / ブランディング基盤
2. **Phase 5: パフォーマンス最適化** → Core Web Vitals スコア向上
3. **Phase 7: 分析メトリクス** → データドリブン改善の基盤
4. 必要に応じて Phase 2 / 3 / 6 を並行実装

---

## 参考リンク

- [GitHub Pages カスタムドメイン](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Eleventy 公式ドキュメント](https://www.11ty.dev/)
- [Google Analytics 4 API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [WCAG 2.1 ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

---

**ステータス**: MVP 後追跡予定、随時アップデート

