# Docker 開発ガイド

このリポジトリは Docker 環境で Eleventy を実行するためのスキャフォールドを含みます。ホストに Node.js を直接インストールせずに開発できます。

ビルド出力は `./_site` に作成されます（`.gitignore` により追跡対象外）。

## 起動（開発）

```bash
docker-compose up --build
```

## バックグラウンド起動

```bash
docker-compose up -d --build
```

## 停止

```bash
docker-compose down
```

## ビルドのみ

```bash
docker-compose build
```
