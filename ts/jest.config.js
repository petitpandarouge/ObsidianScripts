const tsconfig = require("./tsconfig.json");
const makeModuleNameMapper = require("tsconfig-paths-jest");

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: makeModuleNameMapper(tsconfig)
};