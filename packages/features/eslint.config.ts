import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";

import baseConfig from "@chiastack/eslint/base";
import reactConfig from "@chiastack/eslint/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig
) as Linter.Config;
