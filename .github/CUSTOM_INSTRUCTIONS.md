# カスタム命令の構成

このプロジェクトでは、AIアシスタント（GitHub Copilot、Claude、その他のAIツール）向けのカスタム命令を複数のファイルで管理しています。

## ファイル構成

### 1. GitHub Copilot 用カスタム命令

**ファイル**: `.github/copilot-instructions.md`

GitHub Copilot がコード生成、レビュー、コミットメッセージ作成時に参照する命令ファイルです。

**内容**:
- 言語設定（すべて日本語で出力）
- テスト駆動型CI/CD自動化の方針
- Agent skillの活用方法

### 2. Speckit エージェント

**ディレクトリ**: `.github/agents/`

Speckit エージェントシステム用のファイル群です。仕様駆動開発を支援します。

**主要ファイル**:
- `README.md` - Agentsディレクトリの説明文書
- `development-guidelines.md` - 自動生成される開発ガイドライン
- `speckit.*.agent.md` - 各種Speckitエージェント定義ファイル

詳細は [.github/agents/README.md](.github/agents/README.md) を参照してください。

### 3. Speckit 日本語出力ポリシー

**ファイル**: `.specify/JAPANESE_OUTPUT_POLICY.md`

Speckit コマンド（`/speckit.plan`、`/speckit.spec`、`/speckit.tasks` など）の出力を日本語にするためのポリシー文書です。

**内容**:
- 日本語出力のルール
- テンプレートファイルの日本語化手順
- 使用例とトラブルシューティング

### 4. Agent Skills

**ディレクトリ**: `.github/skills/`

再利用可能なスキルテンプレート集です。AIアシスタントが特定のタスクを実行する際に参照します。

**利用可能なスキル**:
- `frontend-design/` - フロントエンドデザインのガイドライン
- `canvas-design/` - Canvas APIを使用したデザイン
- `theme-factory/` - テーマ生成
- `mcp-builder/` - MCP（Model Context Protocol）ビルダー
- その他多数

各スキルの詳細は、それぞれの `SKILL.md` ファイルを参照してください。

## 使用方法

### GitHub Copilot の場合

GitHub Copilot は自動的に `.github/copilot-instructions.md` を読み込みます。追加の設定は不要です。

### Speckit の場合

Speckit コマンドを使用する際は、以下のようにコマンドを実行します：

```bash
# 仕様を作成
/speckit.spec <機能の説明>

# 実装計画を作成
/speckit.plan

# タスクを生成
/speckit.tasks
```

出力は `.specify/JAPANESE_OUTPUT_POLICY.md` に従って日本語で生成されます。

### Agent Skills の場合

VS Code や他のエディタでAIアシスタントを使用する際に、スキルを参照することができます：

```
@skills frontend-design を使用してレスポンシブなナビゲーションバーを実装してください
```

## メンテナンス

### 開発ガイドラインの更新

`.github/agents/development-guidelines.md` は自動生成されるファイルです。更新する場合は以下のスクリプトを実行してください：

```powershell
# PowerShell
.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot
```

### 手動で追加したい内容

自動生成ファイルに手動で追加したい内容がある場合は、以下のマーカーの間に記述してください：

```markdown
<!-- MANUAL ADDITIONS START -->
ここに手動で追加した内容を記述
<!-- MANUAL ADDITIONS END -->
```

## プロジェクト憲法との関連

これらのカスタム命令は、プロジェクト憲法（`.specify/memory/constitution.md`）に基づいています。

**主要な原則**:
- **言語**: すべてのドキュメント、コメント、出力は日本語
- **テスト駆動開発**: テストを先に書く（Red-Green-Refactor）
- **ユーザー体験の一貫性**: 多言語対応を見据えた構造

## トラブルシューティング

### Q: AIアシスタントが英語で出力する

A: 以下を確認してください：
1. `.github/copilot-instructions.md` に言語設定が記載されているか
2. `.specify/JAPANESE_OUTPUT_POLICY.md` のポリシーが適用されているか
3. キャッシュをクリアしてエディタを再起動

### Q: 新しいカスタム命令を追加したい

A: 以下の手順で追加してください：
1. 適切な場所にファイルを作成（`.github/` または `.specify/`）
2. 日本語で記述
3. このファイル（`CUSTOM_INSTRUCTIONS.md`）に追加したファイルの説明を記載
4. 関連する `README.md` も更新

## 参考リンク

- [GitHub Copilot ドキュメント](https://docs.github.com/ja/copilot)
- [プロジェクト憲法](./.specify/memory/constitution.md)
- [貢献ガイドライン](../CONTRIBUTING.md)
