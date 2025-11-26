import { readFile, writeFile } from "node:fs/promises";
import { defineConfig, type UserConfig } from "tsdown";

type PackageJson = {
  name: string;
  exports: Record<string, { import: string; types: string } | string>;
  typesVersions: Record<"*", Record<string, string[]>>;
  files: string[];
  dependencies: Record<string, string>;
  pnpm?: {
    overrides: Record<string, string>;
  };
};

const ESEntries = [
  "./src/trading-chart/chart.tsx",
  "./src/trading-chart/series.tsx",
  "./src/trading-chart/macd-series.tsx",
  "./src/trading-chart/rsi-series.tsx",
  "./src/trading-chart/subscrib-visible-logical-range.tsx",
  "./src/error-boundry/error-boundary.tsx",
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
          .filter((e) => e.endsWith(".tsx") || e.endsWith(".ts"))
          .forEach((entry) => {
            const file =
              entry
                .split("/")
                .pop()
                ?.replace(/\.(tsx|ts)$/, "") ?? "";
            const relativePath = entry
              .replace(/^\.\/src\//, "")
              .replace(/\.(tsx|ts)$/, "");
            pkgJson.exports["./" + file] = {
              import: "./dist/" + relativePath + ".mjs",
              types: "./dist/" + relativePath + ".d.mts",
            };
            pkgJson.typesVersions["*"][file] = [
              "./dist/" + relativePath + ".d.mts",
            ];
          });

        await writeFile("./package.json", JSON.stringify(pkgJson, null, 2));
      },
    },
  ] satisfies UserConfig[];
});
