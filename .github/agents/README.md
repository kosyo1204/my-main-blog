# Agents ディレクトリ

このディレクトリには、プロジェクトで使用されるAIエージェント関連のファイルが含まれています。

## 構成

### Speckit エージェント

Speckitは仕様駆動開発を支援するエージェントシステムです。以下のエージェントファイルが含まれています：

- **speckit.analyze.agent.md** - プロジェクトの分析を行うエージェント
- **speckit.checklist.agent.md** - チェックリストを生成するエージェント
- **speckit.clarify.agent.md** - 要件を明確化するエージェント
- **speckit.constitution.agent.md** - プロジェクト憲法を管理するエージェント
- **speckit.implement.agent.md** - 実装を支援するエージェント
- **speckit.plan.agent.md** - 実装計画を作成するエージェント
- **speckit.specify.agent.md** - 仕様を定義するエージェント
- **speckit.tasks.agent.md** - タスクを管理するエージェント
- **speckit.taskstoissues.agent.md** - タスクをIssueに変換するエージェント

### 開発ガイドライン

- **development-guidelines.md** - プロジェクト全体の開発ガイドライン（自動生成）
  - 使用技術スタック
  - プロジェクト構造
  - コマンド一覧
  - コードスタイル
  - 最新の変更履歴

このファイルは `.specify/scripts/powershell/update-agent-context.ps1` スクリプトによって自動生成されます。

## 関連ファイル

### カスタム命令

AIアシスタント向けのカスタム命令は以下の場所に配置されています：

- **`.github/copilot-instructions.md`** - GitHub Copilot用のカスタム命令
  - 言語設定（日本語使用）
  - テスト駆動型CI/CD自動化
  - Agent skillの活用方法

### 日本語出力ポリシー

- **`.specify/JAPANESE_OUTPUT_POLICY.md`** - Speckit コマンドの日本語出力ポリシー
  - すべてのSpeckit出力を日本語で行うためのガイドライン
  - テンプレートファイルの日本語化手順
  - 使用例とトラブルシューティング

## 使用方法

### Speckitエージェントの使用

Speckitエージェントは、VS Code拡張機能やCLIから以下のように使用します：

```bash
# 仕様を作成
/speckit.spec <機能の説明>

# 実装計画を作成
/speckit.plan

# タスクを生成
/speckit.tasks

# チェックリストを作成
/speckit.checklist
```

### 開発ガイドラインの更新

開発ガイドラインを更新する場合は、以下のスクリプトを実行します：

```bash
# PowerShell（Windows）
.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot

# Bash（Linux/Mac）
# 対応するスクリプトがあれば使用
```

## 注意事項

- **自動生成ファイル**: `development-guidelines.md` は自動生成されるため、直接編集しないでください
- **手動追加**: 手動で追加したい内容は、`<!-- MANUAL ADDITIONS START -->` と `<!-- MANUAL ADDITIONS END -->` の間に記述してください
- **言語**: すべてのドキュメントは日本語で記述してください（プロジェクト憲法に準拠）

## 参考リンク

- [プロジェクト憲法](./.specify/memory/constitution.md)
- [日本語出力ポリシー](./.specify/JAPANESE_OUTPUT_POLICY.md)
- [Copilot命令](./.github/copilot-instructions.md)
