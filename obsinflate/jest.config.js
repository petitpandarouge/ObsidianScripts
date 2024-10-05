const tsconfig = require('./tsconfig.jest.json');
const makeModuleNameMapper = require('tsconfig-paths-jest');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    moduleNameMapper: makeModuleNameMapper(tsconfig),
    testRegex: '(/tests/.*spec)\\.tsx?$',
    coveragePathIgnorePatterns: ['doubles', 'api', 'infrastructure'],
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Tests as specs',
                outputPath: './reports/test-report.html'
            }
        ]
    ]
};
