---
title: 月1回定期監査手順
---

# 月1回定期監査手順

**バージョン**: 1.0  
**最終更新**: 2026-02-15  
**頻度**: 毎月第1月曜日 00:00 UTC  
**実施者**: ブログ管理者  
**実施時間**: 約 30 分

---

## 目的

**Learning Log Blog の品質を継続的に監視・改善する**

- パフォーマンス (Lighthouse)
- Core Web Vitals (LCP, INP, CLS)
- アクセシビリティ (WCAG AA)
- SEO (_Robots, Sitemap_)

---

## 実施スケジュール

```
毎月第1月曜日 00:00 UTC
= 日本時間 毎月第1月曜日 09:00 JST
```

### カレンダー例

| 月 | 日付 | 時刻 (JST) |
|----|------|----------|
| 2月 | 2026-02-02 (日) | 翌日 09:00 → 2026-02-02 |
| 3月 | 2026-03-03 (月) | 09:00 |
| 4月 | 2026-04-07 (月) | 09:00 |
| 5月 | 2026-05-05 (月) | 09:00 |

**注**: 月初が土日の場合は該当日、平日の場合は月初月曜

---

## 準備（実施前日）

### 1. 本番環境の確認

```bash
# 本番 URL
https://myblog.github.io/

# リリース状況確認
git log --oneline -5
```

### 2. 計測ツールの準備

| ツール | 用途 | 準備 |
|--------|------|------|
| **Lighthouse CI** | Performance スコア | npm run test:lighthouse |
| **PageSpeed Insights** | Core Web Vitals | web.dev アクセス確認 |
| **axe DevTools** | a11y チェック | Chrome 拡張機能 |
| **NVDA** | スクリーンリーダー | インストール確認 |

---

## 実行手順（当日）

### Step 1: ローカル環境での検証（5 分）

```bash
# ツール環境確認
npm run build                # ビルド正常動作
npm run test:published       # 公開フィルタ正常動作
npm run test:taxonomy        # タグ/カテゴリー正常動作
npm run test:ga4             # GA4 計測正常動作
npm run test:a11y            # a11y チェック正常動作
```

**期待結果**: すべて✅ Pass

### Step 2: Lighthouse 計測（5 分）

#### 手動計測（PageSpeed Insights）

```
1. https://pagespeed.web.dev/ にアクセス
2. URL 入力: https://myblog.github.io/
3. 分析を実施（モバイル + デスクトップ）
4. スコア記録:
   - Performance: ___ / 100
   - Accessibility: ___ / 100
   - Best Practices: ___ / 100
   - SEO: ___ / 100
```

#### 自動計測（CI/CD）

```bash
# 本番環境 Lighthouse
npm run test:lighthouse
```

### Step 3: Core Web Vitals 計測（3 分）

#### PageSpeed Insights から取得

```
1. PageSpeed Insights の実行結果から
2. Core Web Vitals 欄を確認
   - LCP: ___ ms (目標: ≤ 2,500ms)
   - INP: ___ ms (目標: ≤ 200ms)
   - CLS: ___ (目標: ≤ 0.1)
```

#### Chrome User Experience Report から取得

```
1. https://chromeuxreport.appspot.com/ にアクセス
2. https://myblog.github.io/ を入力
3. 「Good」の割合を確認
   - LCP Good: ___ %
   - INP Good: ___ %
   - CLS Good: ___ %
```

### Step 4: a11y（アクセシビリティ）検査（5 分）

#### 自動検査

```bash
npm run test:a11y
# 結果記録:
# ✅ 0 errors, 0 warnings
```

#### 手動検査（キーボード、スクリーンリーダー）

```bash
npm run dev
# http://localhost:8080 で以下を確認

☐ Tab キーのみで全ナビゲーション可能
☐ フォーカス表示が鮮明（3px outline）
☐ Skip Link 機能（ロゴ → メインコンテンツ）
☐ 見出し階層が正常（h1 → h2 → h3）
```

### Step 5: SEO チェック（2 分）

```bash
# Sitemap 確認
http://localhost:8080/sitemap.xml
→ 全ページが記載されている

# robots.txt 確認
http://localhost:8080/robots.txt
→ User-Agent: * | Allow: /
```

### Step 6: バンドルサイズ確認（3 分）

```bash
# 生成ファイルサイズを確認
du -sh _site/
# 合計: ≤ 150KB が目標

# CSS ファイルサイズ
ls -lh _site/css/site.css
# 目標: ≤ 15KB (gzip)

# HTML ファイルサイズ
ls -lh _site/index.html
# 目標: ≤ 50KB
```

### Step 7: GitHub Actions ワークフロー確認（2 分）

```bash
# 最新の GitHub Actions ワークフロー実行状況
1. https://github.com/myusername/my-main-blog/actions
2. 最新の "deploy" ワークフロー確認
   - ビルドステップ: ✅ Pass
   - テストステップ (test:published, test:404, test:taxonomy, test:ga4): ✅ Pass
```

---

## レポート作成（5 分）

### テンプレート

```markdown
# モニタリングレポート 2026-02-15

## 集計日時
**日本時間**: 2026-02-16 (月) 09:00 JST  
**チェック者**: [名前]  
**実施状況**: ✅ On-time

---

## 1. Lighthouse スコア

| カテゴリ | スコア | 目標値 | 状態 |
|---------|--------|--------|------|
| **Performance** | 85 | ≥ 85 | ✅ Pass |
| **Accessibility** | 95 | ≥ 95 | ✅ Pass |
| **Best Practices** | 92 | ≥ 90 | ✅ Pass |
| **SEO** | 100 | ≥ 95 | ✅ Pass |

**計測環境**: PageSpeed Insights (Mobile)  
**実行時刻**: 2026-02-16 09:00 JST  

---

## 2. Core Web Vitals

| 指標 | 計測値 | 目標値 | 状態 | 前月比 |
|------|--------|--------|------|--------|
| **LCP** | 1.8s | ≤ 2.5s | ✅ Pass | -0.2s ↓ |
| **INP** | 50ms | ≤ 200ms | ✅ Pass | 同 |
| **CLS** | 0.02 | ≤ 0.1 | ✅ Pass | 同 |

**計測元**: Chrome User Experience Report  
**割合（Good）**: LCP 95%, INP 100%, CLS 99%  

---

## 3. アクセシビリティ (A11y)

| 項目 | 状態 | 備考 |
|------|------|------|
| **自動テスト (axe-core)** | ✅ Pass | 0 errors, 0 warnings |
| **キーボード操作** | ✅ OK | Tab ナビゲーション正常 |
| **スクリーンリーダー (NVDA)** | ✅ OK | 見出し階層正常 |
| **コントラスト比** | ✅ OK | 本文 12.6:1 (WCAG AAA) |
| **見出し構造** | ✅ OK | h1 (1), h2 (5), h3 (3) |

---

## 4. SEO チェック

| 項目 | 状態 | 詳細 |
|------|------|------|
| **Sitemap** | ✅ OK | /sitemap.xml (記事数: 1) |
| **robots.txt** | ✅ OK | /robots.txt (Allow: /) |
| **Meta Tags** | ✅ OK | OG タグ、Twitter Card 対応 |

---

## 5. バンドルサイズ

| リソース | サイズ | 予算 | 状態 |
|---------|-------|------|------|
| **_site/ 総量** | 45KB | ≤ 150KB | ✅ OK |
| **CSS** (gzip) | 11KB | ≤ 15KB | ✅ OK |
| **HTML** | 35KB | ≤ 50KB | ✅ OK |
| **その他** | 2KB | ≤ 20KB | ✅ OK |

---

## 6. GitHub Actions ワークフロー

| ステップ | 結果 | 実行時間 |
|---------|------|---------|
| **Checkout** | ✅ Pass | 0.5s |
| **Setup Node** | ✅ Pass | 2.0s |
| **npm ci** | ✅ Pass | 5.0s |
| **npm run build** | ✅ Pass | 0.2s |
| **test:published** | ✅ Pass | 0.1s |
| **test:404** | ✅ Pass | 0.1s |
| **test:taxonomy** | ✅ Pass | 0.1s |
| **test:ga4** | ✅ Pass | 0.1s |

**デプロイ対象**: myblog-public リポジトリ

---

## 7. 前月との比較

| 項目 | 1月 | 2月 | 変化 |
|------|-----|-----|------|
| **Performance** | 85 | 85 | 同 |
| **LCP** | 2.0s | 1.8s | ↓ 0.2s (改善) |
| **記事数** | 1 | 1 | 同 |
| **エラー数** | 0 | 0 | 同 |

---

## 8. 改善アクション

## 対応なし ✅

---

## 9. 次月の優先事項

- [ ] 記事を 2-3 本追加時に a11y 再検査
- [ ] 3 ヶ月分データ集計（四半期レビュー）

---

## 添付資料

- `specs/001-tech-blog/audit-logs/audit-2026-02-15.md`（このレポート）
- PageSpeed Insights スクリーンショット
- Lighthouse JSON export
```

### 保存場所

```
specs/001-tech-blog/audit-logs/audit-{YYYY-MM-DD}.md
```

例: `audit-2026-02-15.md`

---

## 警告・エラー対応

### Yellow（警告）検出時

```yaml
例: LCP = 3.0s (目標 2.5s 超過)

対応:
1. 原因調査
   - WebPageTest で LCP 時間軸を分析
   - フォント、画像の読込時間を確認
2. 改善案
   - font-display: swap
   - 画像最適化
   - CDN キャッシュ確認
3. 実装 → 翌月検証
```

### Red（エラー）検出時

```yaml
例: Performance < 75

対応:
1. 緊急対応
   - 不要な JavaScript 削除
   - 画像圧縮
2. GitHub Issue 作成
   - Label: performance, urgent
3. 即日対応 → 翌日デプロイ
```

---

## チェックリスト（印刷用）

```
[ ] ローカル環境テスト (npm run build, npm run test:*)
[ ] Lighthouse 計測 (PageSpeed Insights)
[ ] Core Web Vitals 確認 (CrUX)
[ ] a11y テスト (axe-core + 手動)
[ ] SEO チェック (Sitemap, robots.txt)
[ ] バンドルサイズ確認
[ ] GitHub Actions ワークフロー確認
[ ] レポート作成・保存
[ ] GitHub リポジトリ更新
```

---

## 参考資料

- [Lighthouse | Google Chrome Developers](https://developer.chrome.com/docs/lighthouse/overview/)
- [Page Speed Insights](https://pagespeed.web.dev/)
- [Chrome UX Report](https://chromeuxreport.appspot.com/)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Budget Calculator](https://www.performancebudget.io/)
