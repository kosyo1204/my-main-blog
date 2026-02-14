// README 自動更新スクリプト
// - package.json と docs/README.md を参照し README の一部を更新する
// - 既存の手書きセクションは保持する
const fs = require("fs/promises");
const path = require("path");

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, "README.md");
const PACKAGE_PATH = path.join(ROOT, "package.json");
const DOCS_INDEX_PATH = path.join(ROOT, "docs", "README.md");

const MARKERS = {
  techStack: {
    start: "<!-- AUTO-GENERATED:TECH_STACK:START -->",
    end: "<!-- AUTO-GENERATED:TECH_STACK:END -->",
  },
  devCmd: {
    start: "<!-- AUTO-GENERATED:DEV_CMD:START -->",
    end: "<!-- AUTO-GENERATED:DEV_CMD:END -->",
  },
  buildCmd: {
    start: "<!-- AUTO-GENERATED:BUILD_CMD:START -->",
    end: "<!-- AUTO-GENERATED:BUILD_CMD:END -->",
  },
  docsGuide: {
    start: "<!-- AUTO-GENERATED:DOCS_GUIDE:START -->",
    end: "<!-- AUTO-GENERATED:DOCS_GUIDE:END -->",
  },
};

function replaceSection(content, startMarker, endMarker, newBody) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Missing or invalid markers: ${startMarker} / ${endMarker}`);
  }

  const before = content.slice(0, startIndex + startMarker.length);
  const after = content.slice(endIndex);
  return `${before}\n${newBody}\n${after}`;
}

function formatCodeBlock(commandLine) {
  return ["```bash", commandLine, "```"].join("\n");
}

function buildTechStack(packageJson) {
  const deps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};

  const depLines = Object.keys(deps).sort();
  const devDepLines = Object.keys(devDeps).sort();

  const lines = [];
  lines.push("**Runtime / Dependencies**");
  if (depLines.length === 0) {
    lines.push("- なし");
  } else {
    depLines.forEach((name) => {
      lines.push(`- ${name}`);
    });
  }

  lines.push("");
  lines.push("**Dev Dependencies**");
  if (devDepLines.length === 0) {
    lines.push("- なし");
  } else {
    devDepLines.forEach((name) => {
      lines.push(`- ${name}`);
    });
  }

  return lines.join("\n");
}

function extractDocsLinks(docsIndexContent) {
  const lines = docsIndexContent.split(/\r?\n/);
  const links = [];
  const linkRegex = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s*(.*)$/;

  lines.forEach((line) => {
    const match = line.match(linkRegex);
    if (match) {
      const label = match[1].trim();
      const href = match[2].trim();
      const suffix = match[3].trim();
      const text = suffix ? ` — ${suffix.replace(/^—\s*/, "")}` : "";
      links.push(`- [${label}](${href})${text}`);
    }
  });

  if (links.length === 0) {
    return "- [docs/README.md](docs/README.md) — ドキュメント全体の目次";
  }

  return links.join("\n");
}

async function main() {
  try {
    const [readmeRaw, packageRaw, docsIndexRaw] = await Promise.all([
      fs.readFile(README_PATH, "utf8"),
      fs.readFile(PACKAGE_PATH, "utf8"),
      fs.readFile(DOCS_INDEX_PATH, "utf8"),
    ]);

    const packageJson = JSON.parse(packageRaw);
    const scripts = packageJson.scripts || {};

    const techStack = buildTechStack(packageJson);
    const devCmd = scripts.dev ? formatCodeBlock(`npm run dev`) : formatCodeBlock("npm run dev");
    const buildCmd = scripts.build ? formatCodeBlock(`npm run build`) : formatCodeBlock("npm run build");
    const docsGuide = extractDocsLinks(docsIndexRaw);

    let updated = readmeRaw;
    updated = replaceSection(updated, MARKERS.techStack.start, MARKERS.techStack.end, techStack);
    updated = replaceSection(updated, MARKERS.devCmd.start, MARKERS.devCmd.end, devCmd);
    updated = replaceSection(updated, MARKERS.buildCmd.start, MARKERS.buildCmd.end, buildCmd);
    updated = replaceSection(updated, MARKERS.docsGuide.start, MARKERS.docsGuide.end, docsGuide);

    if (updated !== readmeRaw) {
      await fs.writeFile(README_PATH, updated, "utf8");
    }
  } catch (error) {
    // 失敗時は非ゼロ終了で CI に失敗を通知する
    console.error("README update failed:", error);
    process.exit(1);
  }
}

main();
