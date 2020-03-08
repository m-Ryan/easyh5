module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "google",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "object-curly-spacing": [2, "always"],
        "linebreak-style": ["error", "unix"],
        "indent": [2],
        "comma-dangle": ["error", "never"],
        "valid-jsdoc": 0,
        "require-jsdoc": 0,
        "no-unused-vars": 0,
        "no-tabs": 0,
        "camelcase": 0,
        "no-mixed-spaces-and-tabs": 0,
        "no-invalid-this": 0,
        "guard-for-in": 0,
        "linebreak-style": "off"
    }
};
// 0 = off, 1 = warn, 2 = error