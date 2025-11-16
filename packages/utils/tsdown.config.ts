import { defineConfig, type UserConfig } from "tsdown";

export default defineConfig((opts) => {
  return {
    entry: ["src/index.ts"],
    clean: !opts.watch,
    minify: true,
    dts: true,
    format: ["cjs", "esm"],
    target: "es2020",
    tsconfig: "tsconfig.build.json",
  } satisfies UserConfig;
});
