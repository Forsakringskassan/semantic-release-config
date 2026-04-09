import defaultConfig, { defineConfig } from "@forsakringskassan/eslint-config";
import cliConfig from "@forsakringskassan/eslint-config-cli";
import typescriptConfig from "@forsakringskassan/eslint-config-typescript";

export default [
    defineConfig({
        name: "Ignored files",
        ignores: [
            "**/coverage/**",
            "**/dist/**",
            "**/node_modules/**",
            "**/temp/**",
        ],
    }),

    ...defaultConfig,
    typescriptConfig(),

    cliConfig({
        files: ["**/*.{js,ts,mjs}"],
    }),

    {
        name: "local/node-native-test",
        files: ["packages/**/*.test.{js,ts}"],
        rules: {
            /* Files is imported by node native test runner */
            "import/extensions": "off",
        },
    },
];
