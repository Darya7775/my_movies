// const LEVEL_CYCLOMATIC_COMPLEXITY = 4;
const INDENT_SPACE = 2;
const IGNORE_NUMBERS = [ 0, 1, 9648, 27 ];

module.exports = {
  "env": {
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "ignorePatterns": [ "webpack.config.js", "*.svg", "fileTransformer.js" ],
  "rules": {
    "indent": [ "error", INDENT_SPACE ],
    "linebreak-style": [ "warn", "unix" ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "semi-spacing":	[ "error", { "before": false, "after": true }],
    "no-duplicate-imports": [ "error", { "includeExports": true }], // Disallow duplicate module imports
    "key-spacing": [ "error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "require-await": "error", // Disallow async functions which have no await expression,
    // "complexity": [ "error", LEVEL_CYCLOMATIC_COMPLEXITY ], // Enforce a maximum cyclomatic complexity allowed in a program
    "eqeqeq": [ "error", "always" ], // Require the use of === and !==
    "no-bitwise": "error", // Disallow bitwise operators
    "no-else-return": [ "error", { allowElseIf: false }], // Disallow else blocks after return statements in if statements
    "no-eval": "error", // Disallow the use of eval(),
    "no-floating-decimal": "error",
    "no-magic-numbers": [ "error", { "ignore": IGNORE_NUMBERS, "ignoreDefaultValues": true, "ignoreArrayIndexes": true }],
    "no-mixed-operators": [ "error", { "groups": [[ "&&", "||", "?:" ]]}], // Disallow mixed binary operators
    "no-multi-assign": [ "error", { "ignoreNonDeclaration": true }], // Disallow use of chained assignment expressions
    "no-multi-str": "error",
    // "no-nested-ternary": "error",
    "no-param-reassign": [ "error", { "props": false }],
    "no-return-assign": [ "error", "always" ],
    "no-script-url": "error",
    "no-shadow": [ "error", { "hoist": "functions" }],
    "no-unneeded-ternary": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "prefer-template": "error", // Require template literals instead of string concatenation
    "quote-props": [ "error", "consistent" ], // Require quotes around object literal property names
    "yoda": "error",
    "array-bracket-spacing": [ "error", "always", { // Enforce consistent spacing inside array brackets
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false
    }],
    "arrow-spacing": "error", // Enforce consistent spacing before and after the arrow in arrow functions
    "block-spacing": "error", // Disallow or enforce spaces inside of blocks after opening block and before closing block
    "brace-style": "warn", // Enforce consistent brace style for blocks
    "comma-spacing": "warn",
    "comma-style": "error",
    "operator-linebreak": [ "error", "before" ], // Enforce consistent linebreak style for operators
    "template-curly-spacing": "error", // spacing around embedded expressions of template strings
    "@typescript-eslint/no-namespace": [ "error", { "allowDeclarations": true }]
  }
};
