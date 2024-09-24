const tsconfig = require('./tsconfig.jest.json');
const makeModuleNameMapper = require('tsconfig-paths-jest');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    moduleNameMapper: makeModuleNameMapper(tsconfig),
    testRegex: '(/__tests__/.*spec)\\.tsx?$',
    coveragePathIgnorePatterns: ['mocks', 'infrastructure'],
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './reports/test-report.html'
            }
        ]
    ]
};
