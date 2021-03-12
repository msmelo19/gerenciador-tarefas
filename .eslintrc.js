module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    camelcase: 0,
    'consistent-return': 0,
  },
};
