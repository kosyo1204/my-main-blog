---
name: frontend-design
description: Learning Logブログのフロントエンド品質基準。UI/UXの一貫性を保ち、アクセシビリティと保守性を担保するためのガイドライン。新規実装や既存コンポーネント改修時に参照してください。
license: Complete terms in LICENSE.txt
---

このスキルは、Learning Logブログのフロントエンド実装における品質基準とレビュー観点を定義します。MVP志向で過度な装飾を避け、実用性と保守性を重視した設計を目指します。

## 対象範囲

- Eleventy (11ty) テンプレート (.njk)
- CSS スタイルシート (site.css)
- JavaScript 機能実装
- レスポンシブデザイン
- アクセシビリティ

## 設計原則

### MVP志向
- **必要最小限の機能から開始**: 過度な装飾やアニメーションは避け、コアとなるUX価値に集中する
- **段階的な改善**: 全てを一度に完璧にせず、ユーザーフィードバックを得ながら反復改善
- **シンプルな実装**: 複雑な抽象化より、理解しやすく保守しやすいコードを優先

### 一貫性
- 既存のデザインシステム（CSS変数、コンポーネントパターン）を尊重
- プロジェクト全体で統一されたビジュアル言語を維持
- 新規実装は既存パターンを踏襲し、必要な場合のみ拡張

---

## 1. レイアウト

### 最低基準

#### コンテナ幅
- **最大幅**: `max-width: 720px` (`.container`) ※現状の `static/css/site.css` 実装値に準拠
- **記事本文**: `max-width: 65ch` (可読性のため) ※現状は `body` で720px制限
- **中央揃え**: `margin: 0 auto`（コンテナの中央揃え）。左右の余白は現状どおり `body { padding: 1rem; }`（768px以上は `2rem`）で確保する。`.container` に `padding: 0 1.5rem` を付与する案は将来の改善候補（推奨）として検討する。

#### グリッドシステム
- フレックスボックスを基本とする（`display: flex` / `flex-direction` / `gap` などのプロパティを活用）
- 複雑なレイアウトには CSS Grid を検討
- モバイルファーストで設計（基本は1カラム、デスクトップで複数カラム展開）

#### レスポンシブブレークポイント

**原則となる主要ブレークポイント（2軸）**
```css
/* モバイル: デフォルト (< 768px) */
/* タブレット: 768px 〜 1024px */
/* デスクトップ: 1025px 〜 */
```

**補助ブレークポイント（コンポーネント都合で追加する場合）**
```css
/* 例: 640px / 641px / 1025px など */
/* 方針: ベースは 768px / 1024px に揃えつつ、必要最小限の補助ブレークポイントのみ追加する */
```

### Do
- ✅ 既存の `.container` クラスを活用
- ✅ モバイルファーストでレイアウト設計
- ✅ 論理的な視覚階層（重要な情報を上部に配置）
- ✅ 十分なタップターゲットサイズ（最低 44×44px）

### Don't
- ❌ 固定幅をハードコード（`width: 800px` など）
- ❌ 過度にネストした構造（3階層以上のflex/grid）
- ❌ ビューポート外への水平スクロールを発生させる
- ❌ デスクトップ専用の前提で実装

---

## 2. タイポグラフィ

### フォントシステム

このプロジェクトでは以下のフォントを使用：

- **Display Font**: `Space Mono` (h1, h2, h3用) - 個性的な等幅フォント
- **Body Font**: システムフォントスタック（本文）、`Literata`（h4-h6見出し用） - 可読性の高いセリフ
- **Monospace**: `JetBrains Mono` (インラインcode用) ※ローカルインストール前提、フォールバックあり

```css
--font-display: 'Space Mono', monospace;
--font-body: 'Literata', serif;
--font-mono: 'JetBrains Mono', 'SFMono-Regular', 'Consolas', monospace;
```

**注意**:
- 本文（`body`）はシステムフォントスタック（`-apple-system, BlinkMacSystemFont, ...`）を使用。`Literata`（`var(--font-body)`）は h4-h6 見出しにのみ適用されます。
- `JetBrains Mono` は Google Fonts から読み込まず、ローカルにインストールされている場合のみ使用されます。インラインの `code` 要素に `var(--font-mono)` が適用されますが、コードブロック（`pre code`）には `SFMono-Regular`、`Consolas` などのシステムフォントが直接指定されています。
- 環境依存を避けるため、コードブロックの表示確認は複数環境で行ってください。

### タイプスケール

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - 基本サイズ */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### 見出し階層

| 要素 | サイズ | フォント | 用途 |
|-----|-------|---------|------|
| h1 | 2.25rem (36px) | Space Mono | ページタイトル |
| h2 | 1.75rem (28px) | Space Mono | セクション見出し |
| h3 | 1.5rem (24px) | Space Mono | サブセクション |
| h4 | 1.25rem (20px) | Literata | 小見出し |
| h5 | 1.125rem (18px) | Literata | 詳細見出し |
| h6 | 1rem (16px) | Literata | 最小見出し |

### 行間（Line Height）

```css
--leading-tight: 1.25;    /* 見出し用 */
--leading-normal: 1.6;    /* 本文用 */
--leading-relaxed: 1.75;  /* 長文用 */
```

### 最低基準

- **最小フォントサイズ**: 16px (1rem) - アクセシビリティ基準
- **本文行間**: 1.6以上（可読性確保）
- **段落間余白**: `margin-bottom: 1em`
- **見出し余白**: `margin-top: 1.5em`, `margin-bottom: 0.5em`

### Do
- ✅ CSS変数（`--text-*`）を使用してサイズ指定
- ✅ 見出しにはDisplay Font、本文にはBody Fontを使用
- ✅ 適切な視覚的階層（h1 > h2 > h3...）
- ✅ 長文には行間を広めに設定（1.6〜1.75）

### Don't
- ❌ 16px未満の本文フォントサイズ
- ❌ 行間1.5未満（読みづらい）
- ❌ 過度なフォントウェイトの混在
- ❌ すべてのテキストをDisplay Fontで装飾

---

## 3. 余白（Spacing）

### スペーシングシステム

**8pxベースのスペーシングスケールを推奨**（将来的なトークン追加提案）

```css
/* 現状は直接 rem 値を使用（例: margin: 1rem, padding: 2rem） */
/* 将来的に CSS 変数化する場合の提案値： */
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
```

**注意**: 現状の `static/css/site.css` には `--space-*` トークンは定義されていません。現行ルールとしては、8pxベースの `rem` 値を直接使用してください（例: `margin: 2rem`, `padding: 1.5rem`）。将来的にデザイントークン化する場合は、上記の変数を `:root` に追加してください。

### 最低基準

- **コンポーネント間**: 最低 `2rem` (32px)
- **セクション間**: 最低 `3rem` (48px)
- **モバイル余白（現在実装値）**: 左右最低 `1rem` (16px, `body` の `padding`)
- **モバイル余白（推奨・将来改善目標）**: 左右最低 `1.5rem` (24px)
- **タップターゲット間隔**: 最低 `8px`

※ 現状の `static/css/site.css` では、モバイルの左右余白は主に `body { padding: 1rem; }` によって確保されています。新規ページやレイアウト改修時には、コンテナ側での `padding` 追加などにより、推奨値の `1.5rem` に段階的に移行することを検討してください。

### Do
- ✅ 一貫したスペーシングスケールを使用
- ✅ 視覚的なグループ化に余白を活用（関連要素は近く、無関係要素は遠く）
- ✅ レスポンシブで余白も調整（モバイルは狭く、デスクトップは広く）
- ✅ 十分な呼吸感（white space）を確保

### Don't
- ❌ 任意の値（13px, 27pxなど）を使用
- ❌ margin/paddingを過度にネスト（計算困難になる）
- ❌ モバイルで余白不足による窮屈なUI
- ❌ 無意味な余白の連続（マージン相殺を理解する）

---

## 4. カラーシステム

### カラーパレット

```css
/* Primary - メインカラー（ブルー系） */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-500: #0ea5e9;
--color-primary-700: #0369a1;
--color-primary-900: #0c4a6e;

/* Neutral - 背景とテキスト */
--color-bg-primary: #fafafa;
--color-bg-secondary: #f5f5f5;
--color-text-primary: #171717;
--color-text-secondary: #525252;
--color-text-tertiary: #a3a3a3;

/* Accent */
--color-accent: #f59e0b;
--color-success: #10b981;
--color-error: #ef4444;
```

### ダークモード対応

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0a0a0a;
    --color-bg-secondary: #171717;
    --color-text-primary: #fafafa;
    /* ... */
  }
}
```

### 最低基準

- **コントラスト比**: WCAG AA準拠（通常テキスト4.5:1、大テキスト3:1）
- **リンク色（現行実装）**: `--color-primary-500` (デフォルト), `--color-primary-700` (hover)
- **リンク色（推奨）**: `--color-primary-700` (デフォルト), `--color-primary-900` (hover) ※WCAG AA 4.5:1準拠。新規実装・既存改修ではこちらに寄せること。
- **ダークモード**: `prefers-color-scheme: dark` で対応

**注意**: `--color-primary-500` (#0ea5e9) を白系背景（`--color-bg-primary` #fafafa）で使用すると、コントラスト比が約2.7:1となりWCAG AA基準を満たしません。既存の `site.css` ではリンクに `--color-primary-500` を使用していますが、順次 `--color-primary-700` (#0369a1) 以上への移行を検討してください。新規実装や改修では、通常テキストやリンクには必ず `--color-primary-700` 以上を使用することを推奨します。

### Do
- ✅ CSS変数（`--color-*`）を使用
- ✅ WCAG AAコントラスト基準を遵守
- ✅ ダークモードでの可読性を確認
- ✅ カラーだけに頼らない情報伝達（アイコン併用など）

### Don't
- ❌ ハードコードされたカラーコード（`#1976d2`など直書き）
- ❌ 低コントラストの組み合わせ
- ❌ ダークモードのテスト不足
- ❌ 色覚異常への配慮不足

---

## 5. ビジュアルエフェクト

### シャドウシステム

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.14);
--shadow-2xl: 0 28px 60px rgba(0, 0, 0, 0.2);
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;  /* pill形状 */
```

### アニメーション

- **transition基準**: `0.2s ease` (標準), `0.3s ease` (やや長め)
- **控えめに使用**: 過度なアニメーションは避ける
- **意味のある動き**: UIフィードバックとして機能するもののみ
- **prefers-reduced-motion対応**: 必須

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Do
- ✅ CSS変数でシャドウとradius定義
- ✅ hover/focus状態に適切なフィードバック
- ✅ `prefers-reduced-motion`に対応
- ✅ パフォーマンスを考慮（transform/opacityを優先）

### Don't
- ❌ 過度な装飾（不要なグラデーション、過剰なシャドウ）
- ❌ アニメーションの乱用（すべてを動かす必要はない）
- ❌ パフォーマンス重いプロパティ（width, height, left/topなど）
- ❌ モーションアクセシビリティの無視

---

## 6. アクセシビリティ (a11y)

### 最低基準（必須）

#### キーボード操作
- ✅ すべてのインタラクティブ要素にキーボードでアクセス可能
- ✅ フォーカス表示の可視化（`:focus-visible`）
- ✅ 論理的なタブオーダー

```css
:focus-visible {
  outline: 2px solid var(--color-primary-700);
  outline-offset: 2px;
}
```

#### セマンティックHTML
- ✅ 適切なHTML要素を使用（`<button>`, `<nav>`, `<main>`, `<article>`など）
- ✅ 見出しレベルの論理的な構造（h1→h2→h3、飛ばさない）
- ✅ ARIAラベルの適切な使用

```html
<button type="button" aria-label="メニュー" aria-expanded="false">
  メニュー
</button>

<nav aria-label="Main navigation">
  <ul>
    <li><a href="#section-1">セクション1</a></li>
    <li><a href="#section-2">セクション2</a></li>
  </ul>
</nav>

<main id="main-content">
  <article>
    <h1>ページタイトル</h1>
    <p>ここにコンテンツが入ります。</p>
  </article>
</main>
```

#### カラーコントラスト
- ✅ 通常テキスト: 4.5:1以上
- ✅ 大テキスト（18px以上）: 3:1以上
- ✅ UIコンポーネント: 3:1以上

#### 代替テキスト
- ✅ 画像には適切な `alt` 属性
- ✅ 装飾画像は `alt=""` で空に

#### スクリーンリーダー対応
- ✅ スキップリンク（`<a href="#main-content" class="sr-only">`）
- ✅ 視覚的に隠すが読み上げ可能なテキスト（`.sr-only`クラス）

### Do
- ✅ 実装後に VoiceOver/NVDA でテスト
- ✅ キーボードのみで操作テスト
- ✅ コントラストチェッカーで検証
- ✅ `validate-a11y.js` テストを実行

### Don't
- ❌ `<div>` をボタン代わりに使用（`<button>` を使う）
- ❌ フォーカス表示を完全に削除（`outline: none`）
- ❌ ARIA属性の誤用・乱用
- ❌ カラーのみで情報を伝達

---

## 7. レスポンシブデザイン

### ブレークポイント

```css
/* モバイル: 〜768px（デフォルト。768px はモバイルに含める） */
@media (max-width: 768px) { /* モバイル: 〜768px */ }
@media (min-width: 769px) and (max-width: 1024px) { /* タブレット: 769px–1024px */ }
@media (min-width: 1025px) { /* デスクトップ: 1025px〜 */ }
```

### 最低基準

- **モバイルファースト**: 基本スタイルをモバイル向けに記述
- **流動的レイアウト**: %やvw/vhを活用
- **タッチ対応**: 最低44×44pxのタップエリア
- **ビューポートメタタグ**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### レスポンシブパターン

#### ナビゲーション
- モバイル: ハンバーガーメニュー
- デスクトップ: 横並びナビゲーション

#### グリッド
- モバイル: 1カラム
- タブレット: 2カラム
- デスクトップ: 3〜4カラム

#### タイポグラフィ
- モバイル: やや小さめ
- デスクトップ: 標準〜大きめ

```css
h1 {
  font-size: 1.875rem; /* 30px - mobile */
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.25rem; /* 36px - desktop */
  }
}
```

### Do
- ✅ 実機・ChromeDevToolsで各ブレークポイントをテスト
- ✅ 画像の最適化とsrcset使用
- ✅ 横スクロールが発生しないか確認
- ✅ タッチ操作の快適性を検証

### Don't
- ❌ デスクトップのみでテスト
- ❌ 固定幅を使用（流動的レイアウトを心がける）
- ❌ モバイルで小さすぎるボタン/リンク
- ❌ 横スクロールを強制するレイアウト

---

## 8. コンポーネント改修時のレビュー観点

既存コンポーネントを修正する際は、以下の観点でレビューしてください。

### チェックリスト

#### デザインシステムへの準拠
- [ ] CSS変数を使用しているか（ハードコードされた値がないか）
- [ ] 既存のスペーシングスケールに従っているか
- [ ] カラーパレットから選択しているか

#### アクセシビリティ
- [ ] キーボードで操作可能か
- [ ] フォーカス表示が適切か
- [ ] コントラスト比がWCAG AA基準を満たすか
- [ ] セマンティックHTMLを使用しているか
- [ ] ARIAラベルが適切か

#### レスポンシブ対応
- [ ] モバイル（<768px）で正しく表示されるか
- [ ] タブレット（768px〜1024px）で正しく表示されるか
- [ ] デスクトップ（>1024px）で正しく表示されるか
- [ ] 横スクロールが発生しないか

#### パフォーマンス
- [ ] 不要な再レンダリングを引き起こさないか
- [ ] アニメーションはtransform/opacityを優先しているか
- [ ] 画像は最適化されているか

#### 保守性
- [ ] コードが理解しやすいか
- [ ] 過度な抽象化を避けているか
- [ ] コメントが必要な箇所に記載されているか
- [ ] 既存パターンを踏襲しているか

---

## 9. 実装時のDo / Don't まとめ

### 全般

| ✅ Do | ❌ Don't |
|-------|----------|
| CSS変数を使用 | ハードコードされた値 |
| 既存パターンを踏襲 | 独自のルールを乱立 |
| MVP志向でシンプルに | 過度な装飾・機能追加 |
| 段階的な改善 | 一度に完璧を目指す |

### レイアウト

| ✅ Do | ❌ Don't |
|-------|----------|
| モバイルファースト | デスクトップ専用の前提 |
| `.container`クラス活用 | 固定幅のハードコード |
| 論理的な視覚階層 | 過度にネストした構造 |

### タイポグラフィ

| ✅ Do | ❌ Don't |
|-------|----------|
| 16px以上の本文サイズ | 16px未満の本文 |
| 行間1.6以上 | 行間1.5未満 |
| CSS変数でサイズ指定 | px直書き |

### アクセシビリティ

| ✅ Do | ❌ Don't |
|-------|----------|
| セマンティックHTML | `<div>`をボタン代わりに |
| キーボード操作テスト | マウス操作のみ前提 |
| コントラスト比確認 | 低コントラストの放置 |

### レスポンシブ

| ✅ Do | ❌ Don't |
|-------|----------|
| 各ブレークポイントでテスト | デスクトップのみテスト |
| 流動的レイアウト | 固定幅の多用 |
| 44×44px以上のタップエリア | 小さすぎるボタン |

---

## 10. テストとバリデーション

### 自動テスト

以下のテストスクリプトを活用してください：

```bash
npm run test:typography    # タイポグラフィ検証
npm run test:a11y          # アクセシビリティ検証
npm run test:visual-effects # ビジュアルエフェクト検証
npm run test:theme         # テーマ/カラー検証
npm run test:animations    # アニメーション検証
```

### 手動テスト

- **ブラウザ**: Chrome, Firefox, Safari
- **デバイス**: iPhone, Android, iPad
- **スクリーンリーダー**: VoiceOver (iOS/Mac), NVDA (Windows)
- **キーボード操作**: Tabキーでの巡回、Enterでの実行

### CI/CD統合

主要なテストは `.github/workflows/deploy-public.yml` で自動実行されます（`test:published`, `test:404`, `test:taxonomy`, `test:link-validation`, `test:typography`, `test:slugify`, `test:animations`, `test:visual-effects` など）。常に最新の一覧は workflow ファイルを確認してください。PR マージ前には必ず CI がグリーンであることを確認してください。

また、CI でカバーされていないテスト（例: `npm run test:a11y`, `npm run test:theme` など）は、レビュアーと合意したタイミングでローカル実行し、結果を PR 上で共有してください。

---

## 11. FAQ

### Q: 新しいCSS変数を追加したい場合は？
A: `static/css/site.css` の `:root` セクションに追加し、既存の命名規則（`--category-name-value`）に従ってください。

### Q: 既存デザインと異なる新しいパターンが必要な場合は？
A: まず既存パターンで対応できないか検討してください。新規パターンが本当に必要な場合は、このSKILL.mdも更新し、他の実装者が参照できるようにしてください。

### Q: ダークモードのテストはどうすれば？
A: ChromeDevToolsの "Rendering" タブから `Emulate CSS media feature prefers-color-scheme` を `dark` に設定してテストできます。

### Q: モバイル実機がない場合は？
A: ChromeDevToolsのデバイスモードを活用してください。ただし、可能であれば実機での最終確認を推奨します。

---

## 12. 参考リソース

- [WCAG 2.1 ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

## 更新履歴

- **2026-03-01**: 初版作成 - Learning Logブログ向けに具体的な実装基準とレビュー観点を定義
