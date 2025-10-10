import config from "eslint-config-standard";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ...config,
    rules: {
      ...config.rules,
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
    },
  },
];
