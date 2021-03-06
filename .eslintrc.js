module.exports = {
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: [
    'jest',
    'react',
    'jsx-a11y',
  ],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  globals: {
    chrome: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'arrow-body-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 0,
    'func-style': [1, 'expression'],
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', 120],
    'new-cap': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/require-extension': 'off',
  },
};
