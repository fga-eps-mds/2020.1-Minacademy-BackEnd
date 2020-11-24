module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  ignorePatterns: ['tests/*'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-undef': 'warn',
    'func-names': 'off',
    'consistent-return': 'off',
  },
};
