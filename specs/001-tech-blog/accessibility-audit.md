---
title: アクセシビリティ監査手順
---

# アクセシビリティ監査手順

**バージョン**: 1.0  
**最終更新**: 2026-02-15  
**対象**: WCAG 2.1 Level AA 準拠  
**頻度**: 月1回定期監査 + 新機能追加時

---

## 監査の目的

**Learning Log Blog のすべてのユーザーが同等の体験を得られることを確保する**

- 視覚障害者・弱視者向けスクリーンリーダー対応
- 運動障害者向けキーボードナビゲーション対応
- 聴覚障害者向けテキスト提供
- 認知障害者向けシンプルな言語・構造

---

## 自動監査（CI/CD）

### 1. axe-core 自動検査

```bash
npm run test:a11y
```

**対象**: ARIA ロール、コントラスト比、テキスト代替、フォーム属性

**チェック項目**:
- ✅ `alt` 属性（すべての `<img>`）
- ✅ 見出しの階層（h1 → h2 → h3）
- ✅ フォームラベル（`<label for="">`）
- ✅ ボタンテキスト（`aria-label` or 視認可能テキスト）
- ✅ ARIA 属性の正当性

### 2. ESLint セマンティック HTML チェック

```bash
npm run test:lint
```

**対象**: HTML 構造の健全性

---

## 手動監査（月1回）

### Step 1: キーボードナビゲーション検査

**目的**: Tab キーのみで全操作が可能か確認

#### Checklist

```bash
1. npm run dev
2. http://localhost:8080 をブラウザで開く
3. キーボード操作の実施:
   ☐ Tab キーで全リンク・ボタンが検出される
   ☐ Shift+Tab で逆方向ナビゲーション可能
   ☐ Enter/Space でリンク・ボタン実行
   ☐ Skip Link でメインコンテンツへジャンプ
   ☐ フォーカス表示が常に視認可能（3px outline）
```

#### 期待動作

```
[Home] → Tab → [Tags] → Tab → [Categories] → Tab → [検索入力]
       ↓ Enter
    記事読込
```

**問題時の対応**:
- フォーカス順序が不自然 → `tabindex` 確認
- フォーカス表示なし → CSS の `:focus-visible` 確認

---

### Step 2: スクリーンリーダー検査

**ツール**: NVDA (Windows 無料) / VoiceOver (macOS/iOS 内蔵)

#### NVDA での検査（Windows）

```
1. NVDA ダウンロード: https://www.nvaccess.org/download/
2. インストール → 起動
3. ブラウザで https://localhost:8080 を開く
4. NVDA + 矢印キーで主要ページをスキャン
```

#### チェック項目

| ページ | チェック項目 |
|--------|-----------|
| **Home** | ページタイトル、記事リスト、ページネーション |
| **/tags/** | タグ一覧、リンク説明 |
| **/tags/{tag}/** | タグ名、フィルタ結果、記事メタデータ |
| **記事詳細** | タイトル、本文、関連リンク |
| **404** | エラーメッセージ、代替リンク |

#### 期待される出力例

```
NVDA: "ブログ - Learning Log. メインコンテンツへスキップ。..."
      ↓ 矢印キー
NVDA: "記事リスト。1 番目。【タイトル】2026年2月14日"
      ↓ 矢印キー
NVDA: "タグ: タグ1, タグ2。カテゴリー: General"
```

**問題時の対応**:
- テキストが読み上げられない → `alt=""` or `aria-hidden` 確認
- 見出し構造が不明瞭 → `<h1>`, `<h2>` の使用確認

---

### Step 3: コントラスト比チェック

**ツール**: WebAIM Contrast Checker / 
Chrome DevTools

#### 自動確認（Chrome DevTools）

```
1. F12 > Elements > Styles
2. 各要素のテキスト色 / 背景色を確認
3. リンク: https://webaim.org/resources/contrastchecker/
   で 手動検証
```

#### WCAG AA 基準

| 要素 | 最小比率 |
|------|----------|
| **本文テキスト** | 4.5:1 |
| **UI ボタン/リンク** | 3:1 |
| **グラフィック/アイコン** | 3:1 |

#### site.css の現在値

```css
/* 本文 */
body { color: #333; background-color: #fff; }
→ 比率: 12.6:1 ✅ WCAG AAA

/* リンク */
a { color: #0066cc; }
→ 比率: 4.5:1 ✅ WCAG AA

/* ダークモード */
@media (prefers-color-scheme: dark) {
  body { color: #e0e0e0; background-color: #1e1e1e; }
  → 比率: 11.2:1 ✅ WCAG AAA
}
```

**問題時の対応**:
- 比率 < 3:1 → テキスト色 or 背景色を変更
- グラデーション使用時も最小コントラスト確認

---

### Step 4: 画像 alt テキスト検査

**手動確認**（自動スクリプト `npm run test:alt-text` で一次フィルタ）

#### Checklist

```bash
☐ すべての <img> に alt 属性あり（npm run test:alt-text で確認済）
☐ alt テキスト内容が適切か（単なる「画像」でない）
☐ 装飾画像は alt="" に設定済
☐ テキスト内容を画像に依存していない
```

#### alt テキストの例

**良い例**:
```html
<img src="blog-owner.jpg" alt="筆者のプロフィール写真（30代男性）">
<img src="decorative-divider.svg" alt="">
```

**悪い例**:
```html
<img src="blog-owner.jpg" alt="写真">  <!-- 不具体 -->
<img src="chart.png">                 <!-- alt 属性なし -->
```

---

### Step 5: 見出し構造検査

**ツール**: Chrome DevTools / WebAIM Headings Map

#### 検査方法

```
1. Chrome DevTools > Elements
2. Ctrl+Shift+I で要素検査
3. 各ページの <h1>, <h2>, <h3> 要素を確認
```

#### WCAG AA 基準

```
✅ 各ページに <h1> が 1 つ
✅ 階層が飛ばない (h1 → h3 の直接遷移なし)
✅ 見出しテキストが意味を持つ（「Section」でない）
```

#### Learning Log Blog の構造

```html
<!-- ホームページ -->
<h1>公開記事</h1>
  <article>
    <h2>最新の記事</h2>
      <h3>記事1タイトル</h3>
      <h3>記事2タイトル</h3>

<!-- 記事詳細ページ -->
<h1>【記事タイトル】</h1>
  <h2>本文第1章</h2>
    <h3>小見出し</h3>
  <h2>本文第2章</h2>
```

**問題時の対応**:
- h1 が複数 → `role="heading" aria-level="1"` で代用
- 見出しテキストが不明確 → 修正

---

### Step 6: フォーム検査

**対象**: 検索フォーム、今後のコメント機能

#### Checklist

```bash
☐ <label> で入力要素と紐付け
☐ focus 時にフォーカス表示（3px outline）
☐ エラーメッセージが aria-describedby で関連付け
☐ ボタンテキストが視認可能
```

#### 例（404 検索フォーム）

```html
<form aria-label="Site search">
  <label for="404-search">キーワード検索:</label>
  <input 
    type="text" 
    id="404-search" 
    name="q" 
    placeholder="記事を検索..." 
    aria-describedby="search-help"
  />
  <small id="search-help">
    入力したキーワードでサイト内の記事を検索します
  </small>
  <button type="submit">検索</button>
</form>
```

---

## 定期監査レポート

### チェックリスト

```markdown
# a11y 監査レポート 2026-02-15

## 自動テスト
- [x] npm run test:a11y
  Result: 0 errors, 0 warnings ✅

## 手動テスト

### 1. キーボードナビゲーション
- [x] Tab キーで全リンク検出
- [x] フォーカス表示が視認可能
- [x] Skip Link 動作確認
Result: OK ✅

### 2. スクリーンリーダー（NVDA）
- [x] ページタイトル読み上げ
- [x] 見出し階層認識
- [x] リンク説明の適切性
Result: OK ✅

### 3. コントラスト比
- [x] 本文: 4.5:1 以上 (実測: 12.6:1)
- [x] リンク: 3:1 以上 (実測: 4.5:1)
- [x] ダークモード対応
Result: OK ✅

### 4. 画像 alt テキスト
- [x] npm run test:alt-text (0 warnings)
- [x] alt テキスト内容が適切
Result: OK ✅

### 5. 見出し構造
- [x] h1 が 1 つ
- [x] 階層が飛ばない
Result: OK ✅

### 6. フォーム
- [x] ラベル紐付け
- [x] フォーカス表示
- [x] エラーメッセージ
Result: OK ✅

## 問題なし ✅
```

---

## 改善時の手順

### 新機能追加時

1. 実装完了
2. `npm run test:lint && npm run test:alt-text` で自動チェック
3. キーボードナビゲーション手動確認
4. NVDA で読み上げ確認
5. マージ

### 問題検出時

```bash
# 例: 見出し階層エラー

1. 問題箇所を特定: <h1> → <h3> 直接遷移
2. 修正: <h2> を挿入
3. テスト
4. specs/001-tech-blog/audit-logs/issues/ に記録
```

---

## 参考資料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Chrome DevTools A11y](https://developer.chrome.com/docs/devtools/accessibility/reference/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
