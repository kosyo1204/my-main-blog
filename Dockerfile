# ベースイメージは Node.js の軽量版（Alpine）を使用
# イメージ内で依存関係をインストールし、ホスト環境を汚しません
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json を先にコピーして依存関係をインストール（キャッシュ向上）
COPY package.json package-lock.json* ./

# OS依存のビルドツールが必要な場合に備えて bash と build-base を一時的にインストール
RUN apk add --no-cache python3 make g++ || true

# 依存関係をインストール
# package-lock.json が無い場合は通常の npm install を使う
RUN npm install --no-audit --no-fund

# アプリファイルはボリュームでマウントするためここではデフォルトの CMD を設定する
# ポート 8080 を公開（Eleventy のデフォルトポートは 8080）
EXPOSE 8080

# 開発用コマンドは docker-compose から渡します
CMD ["npm", "run", "dev"]
