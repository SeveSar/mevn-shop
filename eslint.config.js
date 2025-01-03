import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: {
    css: true,
    less: true,
  },
  rules: {
    'no-console': 'off',
    'curly': ['error', 'multi-line'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'style/semi': ['error', 'always'],
  },
});
