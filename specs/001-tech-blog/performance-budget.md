---
title: パフォーマンス予算
---

# パフォーマンス予算 (Performance Budget)

**最終更新**: 2026-03-01
**監視対象**: 本番環境 GitHub Pages
**計測方法**: Lighthouse CI (自動) + WebPageTest (月1回手動)
**測定条件**: Lighthouse 3回実行、中央値を採用

---

## 目標値

### Core Web Vitals（ユーザー体感）

| 指標 | 値 | 説明 |
|------|-----|------|
| **LCP** | ≤ 2.5s | Largest Contentful Paint（最大コンテンツペイント）|
| **INP** | ≤ 200ms | Interaction to Next Paint（入力から次の表示まで） |
| **CLS** | ≤ 0.1 | Cumulative Layout Shift（累積レイアウト変動） |

**参考**: Google は 2024-09-19 から INP を公式指標に格上げしました

### Google Lighthouse スコア

| カテゴリ | 目標値 | 現在値 |
|---------|--------|--------|
| **Performance** | ≥ 85 | 100 |
| **Accessibility** | ≥ 95 | 91 |
| **Best Practices** | ≥ 90 | 96 |
| **SEO** | ≥ 95 | 100 |

**注記**: Accessibility の CI 閾値は暫定で 91 として運用しており、UI Modernization (#2-#9) 完了後に 95 へ引き上げ予定です。

### バンドルサイズ予算

| リソース | 予算 | 説明 |
|---------|------|------|
| **HTML** | ≤ 50KB | base + article テンプレート含む |
| **CSS** (gzip) | ≤ 15KB | site.css のみ |
| **JS** (gzip) | ≤ 10KB | GA4 + 最小限のインタラクティブ |
| **Total** | ≤ 150KB | ホームページ合計（gzip スキップ）|
| **Images** | ≤ 30KB | ホームページのヘッダー画像等 |

**計測方法**: `npm run build && npx @11ty/eleventy-img`

---

## 制限値（警告/エラー）

### Yellow（警告）

| 項目 | 基準値 |
|------|-------|
| **LCP** | 2.5 - 4.0s |
| **INP** | 200 - 500ms |
| **CLS** | 0.1 - 0.25 |
| **Performance** | 75 - 85 |
| **Accessibility** | 85 - 95 |

→ 改善計画は月1回の定期監査で検討

### Red（エラー）

| 項目 | 基準値 |
|------|-------|
| **LCP** | > 4.0s |
| **INP** | > 500ms |
| **CLS** | > 0.25 |
| **Performance** | < 75 |
| **Accessibility** | < 85 |

→ CI/CD パイプラインで **ビルドを FAIL** にする（本番デプロイ防止）

---

## 監視スケジュール

### 自動監視（CI/CD）

```yaml
Trigger: npm run build 完了後
Tool: Lighthouse CI (GitHub Actions)
Frequency: 毎回ビルド時
Action: スコア < 85 なら失敗
```

### 月1回定期監査

```yaml
Trigger: 毎月第1月曜日 00:00 UTC
Tool: WebPageTest + Lighthouse (manual)
Target: 本番 https://myblog.github.io/
Report: specs/001-tech-blog/audit-logs/ に記録
```

### 四半期監査（Q1/Q2/Q3/Q4）

```yaml
Trigger: 3ヶ月ごと
Tool: WebPageTest (3G Slow, 4G, Wifi)
Review: コア指標の長期トレンド分析
Action: 予算見直し
```

---

## 改善アクション（未達時）

### Performance < 85

1. **画像最適化の確認**
   ```bash
   npm run build && du -sh _site/images/
   ```

2. **CSS/JS 分析**
   ```bash
   npx esbuild .eleventy.js --bundle --analyze 2>&1 | grep "size"
   ```

3. **キャッシュポリシー確認**
   - `.github/workflows/deploy-public.yml` の cache-control Header

### Accessibility < 95

1. **WCAG AA 違反確認**
   ```bash
   npm run test:a11y
   ```

2. **スクリーンリーダー動作確認**
   - NVDA (Windows) または VoiceOver (macOS)

3. **カラーコントラスト確認**
   - site.css の色値を WebAIM Contrast Checker で検証

### Core Web Vitals 未達

| 指標 | 原因の例 | 改善方法 |
|------|---------|---------|
| **LCP > 2.5s** | フォント読み込み遅延 | font-display: swap 設定 |
| **INP > 200ms** | JavaScript 実行遅延 | GA4 非同期読み込み確認 |
| **CLS > 0.1** | 画像サイズ未指定 | `<img width height>` 追加 |

---

## アラート設定

### GitHub Actions 通知

```yaml
# .github/workflows/lighthouse-ci.yml
- name: Fail if Lighthouse score < 85
  if: ${{ steps.lighthouse.outputs.performance < 85 }}
  run: |
    echo "❌ Performance score is below 85"
    exit 1
```

### 月1回定期監査レポート

```text
specs/001-tech-blog/audit-logs/audit-2026-02-15.md
├── Lighthouse スコア
├── Core Web Vitals
├── Bundle サイズ
└── 改善アクション
```

---

## ロードマップ

| 時期 | タスク |
|------|--------|
| **Feb 2026** | Performance 予算定義、Lighthouse CI 初期設定 |
| **Mar 2026** | 1 ヶ月データ収集、トレンド分析 |
| **Apr 2026** | 必要に応じて予算見直し |
| **Ongoing** | 月1回定期監査 + 四半期レビュー |

---

**参考リンク**:
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Performance Budget Calculator](https://www.performancebudget.io/)
