import { defineConfig, type UserConfig } from "tsdown";

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
      entry: ["./src/index.ts"],
      banner: {
        js: '"use client";',
      },
    },
  ] satisfies UserConfig[];
});
