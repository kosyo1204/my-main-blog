# Agent Context: copilot (自動生成 — 手動作成)

Auto-generated context for the copilot agent from `specs/1-learning-log-blog`.

## Active Technologies
- Eleventy (11ty) — Static Site Generator
- Node.js 16+
- GitHub Actions — CI/CD
- GitHub Pages / Netlify — デプロイ先候補
- Google Analytics (GA4) — アクセス解析
- eleventy-img + sharp — 画像最適化

## Project Structure (推奨)
```
content/
  articles/
static/
  images/
config/
  taxonomy.json
.specify/
  templates/
  scripts/

specs/
  1-learning-log-blog/
    spec.md
    research.md
    data-model.md
    contracts/openapi.yaml
    quickstart.md
```

## Commands
- `npx @11ty/eleventy --serve` — ローカルプレビュー
- `npx @11ty/eleventy` — ビルド
- `npm run build` — 例としてのビルドスクリプト

## Notes
- PowerShell スクリプト（`.specify/scripts/powershell/*.ps1`）は CI/ローカルで `pwsh` が必要です。現在この環境で `pwsh` が見つかっていないため、自動スクリプトは実行されていません。必要なら Node ベースの代替スクリプトを追加してください。

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
