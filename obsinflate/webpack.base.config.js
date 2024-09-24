const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { mergician } = require('mergician');

module.exports = (entryName, bundleName, bundlePath, extraConfig = {}) => {
    let base = {
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
                                    console.log(
                                        `Declaring Obsidian types "${p1}"`
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
            plugins: [new TsconfigPathsPlugin({})]
        },
        output: {
            filename: `${bundleName}.js`,
            path: path.resolve(__dirname, `bundles/${bundlePath}`)
        }
    };
    return mergician({})(base, extraConfig);
};
