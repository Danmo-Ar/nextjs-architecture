module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'in-progress',
        'generic',
        'feat',
        'improvement',
        'fix',
        'refacto',
        'perf',
        'test',
        'config',
        'docs',
        'style',
      ],
    ],
  },
};
