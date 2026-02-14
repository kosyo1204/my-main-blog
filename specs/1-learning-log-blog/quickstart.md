# Quickstart: 学習ログブログ（開発者向け）

このクイックスタートはローカルでの開発・プレビュー、ビルド、デプロイ手順を示します。

## 前提
- Node.js 16+ がインストールされていること
- Git が利用可能であること
- Windows 環境で PowerShell スクリプトを使う場合は `pwsh` (PowerShell Core) をインストールすること

## 開発環境セットアップ（Eleventy ベース想定）
```bash
# リポジトリルートで
npm install
```

## 開発サーバー起動
```bash
# 開発用ビルドとローカルサーブ
npx @11ty/eleventy --serve
```

## ビルド（公開用）
```bash
npx @11ty/eleventy --output=_site
# もしくは package.json の `build` スクリプトを利用
npm run build
```

## デプロイ
- GitHub Pages: `gh-pages` ブランチへ `/_site` の中身を push する。GitHub Actions で自動化推奨。
- Netlify: リポジトリを連携し、ビルドコマンド `npx @11ty/eleventy`、公開ディレクトリ `_site` を指定。

## 設定ファイル
- タグ/カテゴリーは `config/taxonomy.json`（例）で事前定義することを推奨。
- `content/articles/` フォルダに Markdown を配置し、フロントマターを付与する。

## PowerShell スクリプトについて
- `.specify/scripts/powershell/*.ps1` が存在しますが、ローカルで実行するには `pwsh` が必要です。CI に `pwsh` が無い場合は代替スクリプト（Node.js）を用意するか、手動手順をドキュメント化してください。

## テスト
- ユニットテスト: 記事パーサ、slug 生成、公開判定などを Jest などで実装することを推奨。
- 統合テスト: `npm run build` 出力の確認（HTML に必要なメタが含まれているか等）

## 注意点
- 非公開記事は `status: draft|private` とし、ビルドから除外してください。
- 画像はビルド時に最適化するワークフローを用意してください（`eleventy-img` + `sharp` など）。
