import nextTypescript from "eslint-config-next/typescript";
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginQuery from "@tanstack/eslint-plugin-query";

const compat = new FlatCompat({
    baseDirectory: import.meta.url,
});

export default [
    ...nextTypescript,
    js.configs.recommended,
    ...next,
    ...nextCoreWebVitals,
    ...pluginQuery.configs["flat/recommended"],
    {
        ignores: [".next/**"],
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": ts,
            react,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "react/react-in-jsx-scope": "off",
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
            "no-unused-vars": "warn",
            semi: ["error", "always"],
            "no-trailing-spaces": "error",
            "no-multiple-empty-lines": ["error", { max: 1 }],
            indent: ["error", 4, { SwitchCase: 1 }],
            "max-len": ["warn", { code: 120, tabWidth: 4, ignoreUrls: true }],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "function" },
                { blankLine: "always", prev: "*", next: "class" },
                { blankLine: "any", prev: "block-like", next: "*" },
            ],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["**/*.js", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: {
            react,
        },
        rules: {
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    ...compat.extends("prettier")
];
