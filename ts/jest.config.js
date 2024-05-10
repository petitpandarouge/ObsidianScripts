/** @type {import('ts-jest').JestConfigWithTsJest} */

function makeModuleNameMapper(srcPath, tsconfigPath) {
  const {paths} = require(tsconfigPath).compilerOptions;
  const aliases = {};
  Object.keys(paths).forEach((item) => {
      const key = item.replace('/*', '/(.*)');
      const path = paths[item][0].replace('/*', '/$1');
      aliases[key] = srcPath + '/' + path;
  });
  return aliases;
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: makeModuleNameMapper('<rootDir>', './tsconfig.json')
};