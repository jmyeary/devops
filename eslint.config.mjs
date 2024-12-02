import globals from "globals";

export default [{
    ignores: [
        "node_modules",
        ".venv",
        "dist",
        "build",
        "**/*.html",
        "**/*.css"
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
