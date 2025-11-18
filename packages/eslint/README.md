# @chiastack/eslint

Shared ESLint configuration package for all projects in the Chiastack monorepo.

## Installation

```bash
pnpm add -D @chiastack/eslint
```

**Note**: This package requires ESLint 9.0.0 or higher as a peer dependency.

## Available Configurations

### `base`

Base ESLint configuration suitable for all project types. Includes:

- **TypeScript ESLint**: Complete TypeScript rule set, including recommended rules, type-checked rules, and stylistic rules
- **Import Plugin**: For checking import statement consistency
- **Turbo Plugin**: Rules supporting Turborepo
- **Strict Rules**:
  - Disallow unused variables (allows variables prefixed with `_`)
  - Enforce type imports
  - Disallow non-null assertions
  - Disallow deprecated APIs
  - Warn on `any` types and unsafe operations

**Usage example:**

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";

export default [
  ...baseConfig,
  // Your other configurations...
];
```

### `react`

React-specific ESLint configuration. Includes:

- **React Plugin**: React recommended rules and JSX Runtime rules
- **React Hooks Plugin**: React Hooks rules, including recommended rules and refs warnings

**Usage example:**

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";
import reactConfig from "@chiastack/eslint/react";

export default [
  ...baseConfig,
  ...reactConfig,
  // Your other configurations...
];
```

### `nextjs`

Next.js-specific ESLint configuration. Includes:

- **Next.js Plugin**: Next.js recommended rules and Core Web Vitals rules
- **Next.js Best Practices**: Automatically checks common issues in Next.js projects

**Usage example:**

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";
import nextjsConfig from "@chiastack/eslint/nextjs";
import reactConfig from "@chiastack/eslint/react";

export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  // Your other configurations...
];
```

## Configuration Features

### TypeScript Support

- **Type Checking**: Uses `projectService: true` to automatically detect TypeScript projects
- **Strict Mode**: Enables all TypeScript ESLint strict rules
- **Type Imports**: Enforces `import type` syntax to separate type imports

### Environment Variable Restrictions

Provides `restrictEnvAccess` configuration to enforce using validated environment variables:

```javascript
import { restrictEnvAccess } from "@chiastack/eslint/base";

export default [
  restrictEnvAccess,
  // Other configurations...
];
```

This rule will:

- Disallow direct use of `process.env`
- Require using `import { env } from '@/env'` to ensure type safety

### Ignore Patterns

The following directories are ignored by default:

- `**/*.config.*` - Configuration files
- `dist/**` - Compiled output directory
- `build/**` - Build output directory
- `node_modules/**` - Dependencies directory

## Rule Details

### Main Rules

- `@typescript-eslint/no-unused-vars`: Error - Disallow unused variables (allows `_` prefix)
- `@typescript-eslint/consistent-type-imports`: Warn - Enforce type imports
- `@typescript-eslint/no-non-null-assertion`: Error - Disallow non-null assertions
- `@typescript-eslint/no-deprecated`: Error - Disallow deprecated APIs
- `@typescript-eslint/no-explicit-any`: Warn - Warn on `any` type usage
- `import/consistent-type-specifier-style`: Error - Enforce top-level type specifier style

### React Rules

- `react-hooks/rules-of-hooks`: Enforce React Hooks rules
- `react-hooks/exhaustive-deps`: Check effect dependencies
- `react-hooks/refs`: Warn - Check refs usage

### Next.js Rules

- Includes all Next.js recommended rules
- Includes Core Web Vitals related rules
- `@next/next/no-duplicate-head`: Disabled (due to compatibility issues)

## Complete Examples

### Next.js Project

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";
import nextjsConfig from "@chiastack/eslint/nextjs";
import reactConfig from "@chiastack/eslint/react";

export default [...baseConfig, ...reactConfig, ...nextjsConfig];
```

### React Project (Non-Next.js)

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";
import reactConfig from "@chiastack/eslint/react";

export default [...baseConfig, ...reactConfig];
```

### TypeScript Project (Non-React)

```javascript
// eslint.config.js
import { baseConfig } from "@chiastack/eslint/base";

export default [...baseConfig];
```

## Dependencies

This package depends on the following ESLint plugins:

- `@eslint/js` - ESLint core rules
- `typescript-eslint` - TypeScript ESLint rules
- `eslint-plugin-react` - React rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `@next/eslint-plugin-next` - Next.js rules
- `eslint-plugin-import` - Import rules
- `eslint-plugin-turbo` - Turborepo rules

## License

Uses the same license as the Chiastack monorepo.
