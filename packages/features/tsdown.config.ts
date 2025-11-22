import { readFile, writeFile } from "node:fs/promises";
import { defineConfig, type UserConfig } from "tsdown";

type PackageJson = {
  name: string;
  exports: Record<string, { import: string; types: string } | string>;
  typesVersions: Record<"*", Record<string, string[]>>;
  files: string[];
  dependencies: Record<string, string>;
  pnpm: {
    overrides: Record<string, string>;
  };
};

const ESEntries = [
  "./src/chat/store/index.tsx",
  "./src/chat/utils.ts",
  "./src/chat/types/message.ts",
  "./src/chat/enums/chat-status.enum.ts",
  "./src/chat/enums/message-role.enum.ts",
  "./src/tic-tac-toe/store.tsx",
  "./src/tic-tac-toe/action.ts",
  "./src/tic-tac-toe/utils.ts",
  "./src/todo/store.tsx",
  "./src/todo/actions.ts",
  "./src/utils/uuid.ts",
  "./src/utils/logger.ts",
  "./src/utils/stream.ts",
  "./src/utils/storeDebug.ts",
  "./src/utils/middleware/create-devtools.ts",
];

export default defineConfig((opts) => {
  const common = {
    clean: !opts.watch,
    dts: true,
    format: ["esm"],
    minify: true,
    outDir: "dist",
  } satisfies UserConfig;
  return [
    {
      ...common,
      entry: ESEntries,
      async onSuccess() {
        const pkgJson = JSON.parse(
          await readFile("./package.json", {
            encoding: "utf-8",
          })
        ) as PackageJson;
        pkgJson.exports = {
          "./package.json": "./package.json",
        };
        pkgJson.typesVersions = {
          "*": {},
        };
        [...ESEntries]
          .filter((e) => e.endsWith(".ts") || e.endsWith(".tsx"))
          .forEach((entry) => {
            // ./src/chat/store/index.tsx -> ./chat/store
            // ./src/chat/utils.ts -> ./chat/utils
            // ./src/utils/middleware/create-devtools.ts -> ./utils/middleware/create-devtools
            const parts = entry
              .replace("./src/", "")
              .replace(/\.tsx?$/, "")
              .split("/");
            const dir = parts[0] ?? "";
            const file = parts[1] ?? "";
            const subDir = parts[2] ?? "";
            const subFile = parts[3] ?? "";

            // 處理多層路徑（如 utils/middleware/create-devtools）
            if (subDir && subFile) {
              // 多層路徑：utils/middleware/create-devtools
              const exportPath = `./${dir}/${file}/${subFile}`;
              const distPath = `${dir}/${file}/${subFile}`;
              const typesKey = `${dir}/${file}/${subFile}`;

              pkgJson.exports[exportPath] = {
                import: `./dist/${distPath}.mjs`,
                types: `./dist/${distPath}.d.mts`,
              };
              pkgJson.typesVersions["*"][typesKey] = [
                `./dist/${distPath}.d.mts`,
              ];
            } else if (parts[parts.length - 1] === "index") {
              // index 文件：chat/store/index -> chat/store
              // 移除最後的 index，保留前面的路徑
              const pathWithoutIndex = parts.slice(0, -1);
              const exportPath = `./${pathWithoutIndex.join("/")}`;
              // dist 路徑保持原樣（包含 index）
              const distPath = parts.join("/");
              const typesKey = pathWithoutIndex.join("/");

              pkgJson.exports[exportPath] = {
                import: `./dist/${distPath}.mjs`,
                types: `./dist/${distPath}.d.mts`,
              };
              pkgJson.typesVersions["*"][typesKey] = [
                `./dist/${distPath}.d.mts`,
              ];
            } else {
              // 一般情況：參考 services 的邏輯
              // 如果文件名和目錄名相同，只使用目錄名；否則使用完整路徑
              const exportPath =
                file && file !== dir ? `./${dir}/${file}` : `./${dir}`;

              // dist 路徑：總是使用 dir/file 格式
              const distPath = file ? `${dir}/${file}` : `${dir}/${dir}`;

              // typesVersions 的 key：如果文件名和目錄名相同，只用目錄名；否則用完整路徑
              const typesKey = file && file !== dir ? `${dir}/${file}` : dir;

              pkgJson.exports[exportPath] = {
                import: `./dist/${distPath}.mjs`,
                types: `./dist/${distPath}.d.mts`,
              };
              pkgJson.typesVersions["*"][typesKey] = [
                `./dist/${distPath}.d.mts`,
              ];
            }
          });

        await writeFile("./package.json", JSON.stringify(pkgJson, null, 2));
      },
    },
  ] satisfies UserConfig[];
});
