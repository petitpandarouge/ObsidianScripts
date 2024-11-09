# Webpack considerations 🧠

In a classic Obsidian plugin, the `externals` property is used to indicate `obsidian` is an external module that will be imported using commonjs style.

``` javascript
module.exports = {
  ...
  externals: {
      obsidian: 'commonjs obsidian'
    }
  ...
};
```

In the JS context in which the inflates will be executed, the `obsidian` module does not exist. At least the classes are available without any need of `require` call.

To make the JS works at runtime, the `imports` from the `obsidian` module❗importing a class that is instanciated in the code❗are overwriten by a declare at the bundling time. This is for instance the case for the `Notice` class.

``` javascript
// webpack.base.config.js
module.exports = {
  ...
  module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'ts-loader',
            {
              loader: 'string-replace-loader',
              options: {
                search: "import { Notice } from 'obsidian';",
                replace: (match) => {
                    return "declare const Notice: any;";
                  }
              }
            }
          ],
          ...
        },
      ],
    },
  ...
};
```

> ⚠️ Loaders execution order in the `use` property is from the BOTTOM to the TOP. This coast me several hours of struggle 🥲.
