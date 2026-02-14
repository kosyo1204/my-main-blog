# Research: 学習ログブログ の未決事項と決定

このドキュメントは、`spec.md` の未解決事項（NEEDS CLARIFICATION）に対する提案決定、根拠、代替案をまとめたものです。

## 1. ホスティング（Hosting）
- Decision: GitHub Pages または Netlify を優先して利用する（初期は GitHub Pages）。
- Rationale: 無料プランで静的サイトホスティングが可能。CI/CD のセットアップが容易で、リポジトリと親和性が高い。
- Alternatives considered: Vercel（静的/SSRに強い）、AWS/GCP（高柔軟だが初期コストと運用負荷が高い）。

## 2. 静的サイト生成器（Preview / Build）
- Decision: Eleventy (11ty) を採用する。
- Rationale: Markdown を扱う静的サイト生成が得意で、設定が軽量、ビルドが高速。GitHub Pages との相性も良い。
- Alternatives considered: Astro（モダンだが学習コスト）、Hugo（Goベースで高速だが環境依存）、Next.js（機能過剰でホスティングに制約）。

## 3. CI/CD と公開ワークフロー
- Decision: GitHub Actions で `build` → `deploy` を設定し、デプロイ先は GitHub Pages または Netlify。
- Rationale: リポジトリ統合がシンプルで、プルリク→マージで公開のフローを自動化できる。
- Alternatives: Netlify の独自ビルド/デプロイフロー（使いやすい GUI）。

## 4. 記事メタデータとファイルレイアウト
- Decision: 各記事は Markdown + YAML frontmatter（title, date, status, publish_date, tags, category, slug, author）で管理。記事は `content/articles/`（下書きは `drafts/` サブフォルダでも可）。
- Rationale: フロントマターは多くの SSG と互換性が高く、CI でのフィルタリングやビルドが容易。
- Alternatives: 外部 CMS（headless CMS）を利用する方法（将来的な拡張向け）。

## 5. スラッグの一意性 (slug collision)
- Decision: 初期ルールは `YYYY-MM-DD-slug`。同日に同一スラッグが存在する場合は `-1`, `-2` のように連番を付与し、警告を出す。手動調整も許容。
- Rationale: 日付ベースが読みやすく衝突可能性を低減。自動連番付与で衝突を回避。
- Alternatives: UUID やフルタイムスタンプを利用（可読性低下）。

## 6. 画像管理と最適化
- Decision: 画像はリポジトリ内に保存（`static/images/` または `content/images/`）。ビルド時に `eleventy-img`（sharp）で WebP 変換・リサイズを行い、推奨最大 2MB をドキュメント化。
- Rationale: リポジトリ内管理はローカルワークフローに親和的。ビルドで最適化することで公開サイトのパフォーマンスを担保できる。
- Alternatives: 外部ストレージ（S3 等）や CDN（将来的なスケール時）。

## 7. 非公開（private/draft）記事の扱い
- Decision: frontmatter の `status: draft|published|private` を用い、ビルド時に `published` のみを出力。sitemap/robots.txt/feeds も published のみ含める。
- Rationale: 非公開記事は静的生成物に含めないことで URL 推測対策となる。
- Alternatives: Basic 認証をかける（公開中サイトを限定する場合）。

## 8. アクセス解析（Analytics）
- Decision: 初期は Google Analytics（GA4）を推奨。代替として Plausible などプライバシーフレンドリーなサービスも検討可能。
- Rationale: GA4 は無料かつ広く使われている。ダッシュボードで PV 等が確認しやすい。
- Alternatives: Plausible（軽量でプライバシー重視）、自前ログ集計（実装コスト高）。

## 9. ローカルプレビュー方法
- Decision: Eleventy の開発サーバー (`eleventy --serve`) を使う。公開と同等のテンプレートでプレビューできるようにする。
- Rationale: SSG の標準ワークフローに沿うため。ホットリロードで編集→確認が容易。
- Alternatives: ローカルで簡易HTTPサーバーを立てる方法。

## 10. サイトマップ / robots / 非公開記事の検索排除
- Decision: ビルドで sitemap.xml を生成（published のみ）。robots.txt は公開サイト向けに適切に設定し、非公開記事は含めない。
- Rationale: SEO 要件と非公開記事の排除を同時に満たす。

## 11. テスト方針（憲法準拠）
- Decision: TDD を遵守。ユニットテスト（記事パーサ、slug生成、公開判定）、統合テスト（ビルド出力確認）、E2E（重要な UI フローは後段で検討）。
- Rationale: プロジェクト憲法で TDD が必須のため。

## 12. CI 上での懸念（PowerShell スクリプト実行）
- Observation: `.specify/scripts/powershell/setup-plan.ps1` や `update-agent-context.ps1` が存在するが、CI/ローカル環境に PowerShell (pwsh) が無いと実行できない。
- Recommendation: Windows 環境では PowerShell、Linux/macOS では PowerShell Core (`pwsh`) をインストールする手順を `quickstart.md` に明記するか、同等の Node スクリプトを提供する。

---

次のステップ: この `research.md` を確認して頂き、決定事項に問題がなければ Phase 1（`data-model.md`、`/contracts`、`quickstart.md` の作成）に進みます。