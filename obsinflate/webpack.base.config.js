/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { mergician } = require('mergician');

module.exports = (entryName, bundleName, bundlePath, extraConfig = {}) => {
    let base = {
        target: 'node',
        mode: 'development',
        devtool: 'eval-source-map',
        entry: `${path.resolve(__dirname, 'src')}/${entryName}.ts`,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'ts-loader',
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: /import\s*{([^}]+)}\s*from\s*'obsidian';/g,
                                replace: (_match, p1) => {
                                    const includedImports = [' Notice '];
                                    if (!includedImports.includes(p1)) {
                                        return `import {${p1}} from 'obsidian';`;
                                    }
                                    console.log(
                                        `Declaring Obsidian types "${p1}" for "${entryName}" module.`
                                    );
                                    const imports = p1
                                        .split(',')
                                        .map((item) => item.trim());
                                    return imports
                                        .map(
                                            (imp) =>
                                                `declare const ${imp}: any;`
                                        )
                                        .join('\n');
                                }
                            }
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            plugins: [new TsconfigPathsPlugin({})],
            alias: {
                handlebars: 'handlebars/dist/handlebars.min.js'
            }
        },
        output: {
            filename: `${bundleName}.js`,
            path: path.resolve(__dirname, `bundles/${bundlePath}`)
        }
    };
    return mergician({})(base, extraConfig);
};
