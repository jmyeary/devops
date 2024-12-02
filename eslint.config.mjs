import globals from "globals";

export default [{
    ignorePatterns: [
        "**/node_modules/**",
        "**/.venv/**",
        "**/dist/**",
        "**/build/**"
    ],
    files: ["**/*.js"],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
            ...globals.jest,
        },
        ecmaVersion: 2022,
        sourceType: "module",
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es2022: true
    },
    rules: {
        "no-const-assign": "error",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": ["warn", { 
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true 
        }],
        "constructor-super": "warn",
        "valid-typeof": "warn",
    },
}];
