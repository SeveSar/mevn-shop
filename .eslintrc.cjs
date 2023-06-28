/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
  ],
  plugins: ['prettier'],

  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vue/attributes-order': 0,
    'vue/attribute-hyphenation': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/require-default-prop': 0,

    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        printWidth: false,
        // endOfLine: false,
        // parser: 'flow',
      },
    ],
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
};
