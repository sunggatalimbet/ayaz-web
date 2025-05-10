module.exports = {
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  useTabs: false,
  arrowParens: 'always',
  jsxSingleQuote: true,
  trailingComma: 'all',

  importOrderParserPlugins: ['classProperties', 'typescript', 'jsx'],
  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  tailwindFunctions: ['clsx', 'cn', 'cx', 'cva'],
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
};
