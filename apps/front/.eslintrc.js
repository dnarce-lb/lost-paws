module.exports = {
  extends: ['custom'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'consistent-return': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-promise-reject-errors': 'off',
  },
};
