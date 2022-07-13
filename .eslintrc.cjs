/* eslint-env node */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": 2,
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "off",
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/order": [
      "error",
      {
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "**/*.css",
            group: "unknown",
            position: "after",
          },
          {
            pattern: "**/*.scss",
            group: "unknown",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "build/",
    "dist/",
    "out/",
    ".next/",
    "src/data/guides/compiled/",
  ],
};
