---
title: Core Web Vitals 定義
---

# Core Web Vitals 定義

**最終更新**: 2026-02-15  
**準拠対象**: Google 公式基準（2024年9月版）

---

## 3 つの核となる指標

Google が定めた「ユーザー体感品質」を示す 3 つの指標。

### 1. LCP (Largest Contentful Paint)

**最大コンテンツペイント：ページに最も大きなコンテンツが表示されるまでの時間**

```
目標値: ≤ 2.5 秒
警告: 2.5 - 4.0 秒
エラー: > 4.0 秒
```

#### 対象要素

- `<img>` タグ
- `<svg>` 画像
- `<video>` ポスター画像
- テキストノード（段落、見出し）

#### 最適化方法（Learning Log Blog）

1. **フォント読み込み最適化**
   ```css
   @font-face {
     font-family: "System Font";
     font-display: swap;  /* 瞬時に本文表示、フォント読込後置換 */
   }
   ```

2. **画像最適化**（既実装）
   ```nunjucks
   {% image "/photos/blog-hero.jpg", "Blog hero" %}
   → 自動的に AVIF/WebP/JPEG 出力
   ```

3. **キャッシュ設定**
   - GitHub Pages: `Cache-Control: max-age=3600` (1 時間)

4. **関連リソースの優先読み込み**
   ```html
   <link rel="preload" as="image" href="/images/hero.avif">
   ```

---

### 2. INP (Interaction to Next Paint)

**入力から次の表示まで：クリック/タップから画面更新までの時間**

```
目標値: ≤ 200 ms
警告: 200 - 500 ms
エラー: > 500 ms
```

#### 計測対象

- クリック
- キータップ
- ポインタダウン

#### Learning Log Blog での対応

このブログは **静的サイト** であり、インタラクティブな処理が少ないため、INP は自然と低い傾向にあります。

**現在の構成**:
- GA4 スクリプト: 非同期読込（`async` 属性）
- JavaScript: 最小限（GA4 のみ）
- CSS: インラインまたは外部リンク（クリティカルCSSなし）

**監視項目**:
- 内部リンククリック（タグ → 記事）
- ページネーション（ページ移動）
- GA4 イベント送信の遅延

---

### 3. CLS (Cumulative Layout Shift)

**累積レイアウト変動：ページ読込中の予期しないレイアウト変動量**

```
目標値: ≤ 0.1
警告: 0.1 - 0.25
エラー: > 0.25
```

#### 計測方法

```
CLS = Σ(layout shift scores for every frame)
     = (impact fraction) × (distance fraction)
```

#### Learning Log Blog での対応

**ビューポート変動の最小化**:

1. **画像サイズ指定**（既実装）
   ```html
   {% image "/images/foo.jpg", "Description" %}
   → width/height 自動設定
   ```

2. **AdSense/広告スペースの予約**
   - 現在 AdSense なし → CLS への影響なし

3. **フォント読込のブロック防止**
   ```css
   font-display: swap;   /* レイアウトシフト最小化 */
   ```

4. **Cookie バナー等の固定配置**
   - 現在未実装 → 追加時は固定配置（`position: fixed`）

### 監視スコア

```json
{
  "lcpParts": [
    {
      "element": "<img>",
      "renderTime": 1800,
      "loadTime": 1500
    }
  ],
  "inpEvents": [
    {
      "processingDuration": 50,
      "presentationDelay": 100
    }
  ],
  "clsScore": 0.02
}
```

実際の計測は Chrome DevTools Performance タブまたは WebPageTest で確認。

---

## 計測環境

### 開発環境

```bash
# ローカルでの計測
npm run build
npm run dev  # http://localhost:8080

# Chrome DevTools
1. F12 > Performance タブ
2. 記録開始
3. ページ読込
```

### 本番環境

```bash
# GitHub Pages での計測
URL: https://myblog.github.io/
Tool: WebPageTest.org または Lighthouse CI
```

### テスト環境（Web Vitals API）

```javascript
// _site/ の各ページに埋め込まれる GA4 スニペットから
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(metric => console.log('CLS:', metric.value));
getLCP(metric => console.log('LCP:', metric.value));
```

---

## Google の評価基準（SEO）

2024年9月より、Google Search Console では以下の分布を表示：

| 評価 | LCP | INP | CLS |
|------|-----|-----|-----|
| Good（推奨） | ≤ 2.5s | ≤ 200ms | ≤ 0.1 |
| Needs Improvement | 2.5 - 4.0s | 200 - 500ms | 0.1 - 0.25 |
| Poor（問題） | > 4.0s | > 500ms | > 0.25 |

**Learning Log Blog の目標**: Good ランク維持

---

## ダッシュボード連携

### PageSpeed Insights

```text
URL: https://pagespeed.web.dev/
Input: https://myblog.github.io/
Output: モバイル/デスクトップ スコア
```

### CrUX（Chrome User Experience Report）

```text
URL: https://chromeuxreport.appspot.com/
Input: myblog.github.io
Output: 実ユーザーデータ（28日間ローリング）
```

### Lighthouse CI

```bash
npm run test:lighthouse  # 自動化（Git push 時）
```

---

## 改善計画（未達時）

### LCP > 2.5s 対応

```yaml
Step 1: WebPageTest で LCP 時間軸を分析
Step 2: Critical Path（重要な読込順序）を確認
Step 3: 以下から改善を試行
  - フォント preload（@font-face）
  - 画像サイズ最適化
  - 不要な 3rd-party スクリプト削除
```

### INP > 200ms 対応

```yaml
Step 1: Chrome DevTools Performance タブで JS 実行時間を分析
Step 2: イベントリスナー（Click, Tap）の処理時間を確認
Step 3: 改善方法
  - requestIdleCallback() で低優先度処理を後延ばし
  - Web Worker に計算を移行
  - GA4 イベント送信の最適化
```

### CLS > 0.1 対応

```yaml
Step 1: WebPageTest で Layout Shift ウォーターフォール確認
Step 2: レイアウト変動箇所を特定
Step 3: 改善方法
  - <img> に width/height を明記
  - 動的生成要素に縦幅容器を確保
  - font-display: swap → block（必要な場合）
```

---

## 参考資料

- [Web Vitals: Google の Core Web Vitals](https://web.dev/vitals/)
- [LCP: Largest Contentful Paint - web.dev](https://web.dev/lcp/)
- [INP: Interaction to Next Paint - web.dev](https://web.dev/inp/)
- [CLS: Cumulative Layout Shift - web.dev](https://web.dev/cls/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome User Experience Report](https://chromeuxreport.appspot.com/)
