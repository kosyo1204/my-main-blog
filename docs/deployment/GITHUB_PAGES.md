# GitHub Pages デプロイ（master）

このドキュメントは、`master` ブランチの内容を GitHub Pages にデプロイする設定手順をまとめます。

## 前提

- GitHub Actions のワークフローが有効であること
- `master` ブランチに `pages.yml` が存在すること

## 手順

1. GitHub のリポジトリ設定を開く
2. Settings → Pages を開く
3. Source を「GitHub Actions」に設定する
4. 反映後、`master` への push で自動デプロイが実行される

## 動作確認

- Actions タブで `Deploy to GitHub Pages` の成功を確認する
- Pages の URL を開き、トップページが表示されるか確認する

## 注意点

- デプロイ対象は `master` のみ
- `develop` や `feature/*` は CI のみ実行される
