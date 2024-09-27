# ObsidianScripts 📜

This is the name I use to identify the very first scripts I have written to inflate Obsidian.
They are written in JS, and can be opened using the `ObsidianScripts.code-workspace` file.

It's a good version to work with, but I'm now afraid of modifying them and break something as they are not protected by tests.
This is where `Obsinflate` comes into the game.

I keep them here as I slowly but surely move them into the `Obsinflate` framework.

# Obsinflate 🎈

[![Test](https://github.com/petitpandarouge/ObsidianScripts/workflows/Build%20and%20test%20project/badge.svg)](https://github.com/petitpandarouge/ObsidianScripts/actions?query=workflow%3A%22Build+and+test+project%22) 
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

TypeScript framework that allows building extension scripts for the following Obsidian plugins : 
- [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
- [User Plugins](https://github.com/mnowotnik/obsidian-user-plugins)
- [Quick Add](https://quickadd.obsidian.guide/docs/)

The benefits of this framework are
- having a fully tested code, to easely **maintain** it,
- having a fully typed code, to easely **read** it.

The framework is implemented following the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) method. The tests are then the [specs](https://html-preview.github.io/?url=https://github.com/petitpandarouge/ObsidianScripts/blob/main/obsinflate/reports/test-report.html) 🔥.

> 🔎 NOTE : In the whole documentation, I call `inflates` all the scripts implemented using this framework.

## Building and bundling 🧱

`git clone` this repo and execute the following commands:

``` sh
cd obsinflate
npm install
npm run build
npm run bundle
```

Resulting bundles are generated into the `bundles` directory.

## Implementing 🛠️

The source code is organized as follow:
- `src`: Contains Obsidian extensions classes and common utility classes.
- `src/user-plugins`: Contains the User Plugins plugin specific sources.
- `src/quick-add`: Contains the QuickAdd plugin specific sources.
- `src/dataview`: Contains the Dataview plugin specific sources.
- `src/infrastructure`: Contains the code that does not need to be tested. Mainly wrapper services used to make the code testable using the dependency injection.

### UserPlugins 🧩

- The entry point is represented by the `main.ts` file that must contains an `onload` function. 
- The `CommandLoader` is the main class responsible for loading the commands into the `Plugin`.

``` typescript
export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => {
            const noticer = new Noticer();
            return new HelloWorldCommand(plugin, noticer);
        }
    ]);
}
```

- A command must implement an `AbstractCommand`.
- The command logique is in the `callback` function.

``` typescript
export class HelloWorldCommand extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        private noticer: INoticer
    ) {
        super(plugin);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    callback(): Promise<void> {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
```

### QuickAdd 🧩

One ts file must contain only one script that can be implemented using two ways.

#### Script without settings

- Using the `Script` interface, a script must be implemented as follow.

``` typescript
class HelloWorld implements Script {
    constructor(private noticer: INoticer) {}
    entry() {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
```

- The script can be initialized and exported using the `module.exports` directive.

``` typescript
const entryPoint: ScriptEntryPoint = async () => {
    const noticer = new Noticer();
    const helloWorld = new HelloWorld(noticer);
    await helloWorld.entry();
};

module.exports = entryPoint;
```

#### Script with settings

- This interface `SettingableScript` must be implemented to implement a script having UI settings.

> ⚠️
> All the dependencies must be `public` and called without `this` in order to be reachable at runtime.
> It's the case here with the `noticer` property. 

``` typescript
class HelloWorld implements SettingableScript {
    noticer: Noticer;
    constructor(noticer: INoticer) {
        this.noticer = noticer;
    }
    entry(
        _params: Parameters,
        settings: { [key: string]: string | boolean }
    ): Promise<void> {
        noticer.notice(`Hello ${settings['Name']} !`, 5000);
        return Promise.resolve();
    }
    settings = {
        name: 'Hello World',
        author: 'me',
        options: {
            Name: {
                type: 'text' as TextFieldType,
                description: 'The name to say hello',
                defaultValue: 'World',
                placeholder: 'World'
            }
        }
    };
}
```

- The script is exported by exporting an instance of the created class.

``` typescript
const noticer = new Noticer();
module.exports = new HelloWorld(noticer);
```

### Dataview 🧩

#### View

Implementing a view relies on implementing two interfaces: `View` and `ViewBuilder`.

##### View without input

- A view implements `View`.

``` typescript
class HelloWorld implements View {
    constructor(private noticer: INoticer) {}
    render(dv: DataviewApi) {
        dv.header(1, "Hello World");
        dv.table(['Name', 'Ids'], [['Me', 0]]);
        this.noticer.notice('View built !', 5000);
    }
}
```

- And its builder `ViewBuilder`.
  - The builder must be named `<viewName>Builder`;
  - The builder is the only class exported.

``` typescript
export class HelloWorldBuilder implements ViewBuilder {
    build() {
        const noticer = new Noticer();
        return new HelloWorld(noticer);
    }
}
```

##### View with input

- Inputs can be explicitely defined using an interface.

``` typescript
interface Input {
    name: string;
} 
```

- Same rules applies to the `View` and `ViewBuilder`.
- The only difference here in the `input` given in parameter of the `render` method.

``` typescript
class HelloWorld implements View {
    render(dv: DataviewApi, input: Input) {
        const header = input.name ? `Hello ${input.name}` : 'Hello World';
        dv.header(1, header);
        dv.table(['Name', 'Ids'], [['Me', 0]]);
    }
}
```

## Testing and debugging 🐞

### Unit tests

The `tests` directory contains all the framework unit tests and relative sources.

To debug threw `VS Code`
- Open a `Javascript Debug Terminal`;
- Add the wanted breakpoints into the code;
- And run the unit tests with the `npm run test:unit` command.

### Integration tests

All the scripts are webpacked with the source mapping option activated. It means that you'll be able to debug your code into Obsidian viewing the TypeScript version :sunglasses:

Vaults per plugin have been configured in the `vaults` directory, and a `test:integration:<plugin-name>` command has been created to automatically launch the vault allowing you to integrate your scripts. The `How to debug.md` file of each vault will guide you threw the process.

> Note : The vaults must be opened explicitly once using the Obsidian UI for the command to work. 

To see more about how this works, you can run the following commands to test it with the `UserPlugins` plugin `Hello World`.

``` sh
cd obsinflate
npm install
npm run build
npm run bundle:helloworld
npm run test:integration:userplugins
```

## Deploying 🚀

🚧 The command is currently in build state but I plan to build a command that deploys the scripts into a vault directory.

## Working with Obisidian API 🧠

This chapter summaries all the considerations to take in account when working with the Obsidian API through this framework. This API is referenced into the framework under the `node_modules/obsidian` directory.

### Jest considerations

[None of this API part can be referenced into a jest test dependency](https://www.moritzjung.dev/obsidian-collection/plugin-dev/testing/challengeswhentestingplugins/). To be able to still reference the Obsidian API in the main code, I've overloaded the "paths" variable in a tsconfig file specific to jest.

``` json
// tsconfig.jest.json
{
  "extends": "./tsconfig.json",

  "compilerOptions": {
    "paths": {
      ...
      "^obsidian$": ["tests/mocks/obsidian"] // This is the magic line 🪄
    }
  }
}
```

This way
- In a build (`npx tsc --project tsconfig.build.json`), `import { ... } from 'obsidian'` will reference the real Obsidian API.
- In a build for test (`npx tsc --project tsconfig.build.for.jest.json`), `import { ... } from 'obsidian'` will reference the `tests/mocks/obsidian` module.

> ⚠️ This means each time a `import { ... } from 'obsidian'` is writen, a mock interface must be written in `tests/mocks/obsidian`.

This hack allows 
- to implement the inflates being able to have the intellisense of the real Obsidian API;
- to have a code protected by tests.

### Webpack considerations

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

To make the JS works at runtime, the `imports` from the `obsidian` module❗importing a class that instanciated in the code❗are overwriten by a declare at the bundling time. This is for instance the case for the `Notice` class.

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

### Module functions considerations

I call module functions the functions that only reachable though the module.

Module functions cannot be accessed in a JS script as import is not available. For instance, [this](https://docs.obsidian.md/Plugins/User+interface/Icons#Use+icons) is possible when implementing an Obsidian plugin, but in a JS context, the `setIcon` function won't be found.

``` typescript
import { Plugin } from 'obsidian';
import { setIcon } from 'obsidian'; // => 💥 ERROR : This is not possible in a JS context
...
export class SampleCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = 'sample';
    name: string = 'sample';
    callback(): Promise<void> {
        const item = this.plugin.addStatusBarItem();
        setIcon(item, 'info');    // => 💥 ERROR : setIcon not found
        return Promise.resolve();
    }
}
```

For a module function to be accessed in a JS context, the whole module must have been loaded and reachable though an existing object property.

Only the `UserPlugins` provides this possibility through the `passedModules.obsidian` property. Thanks to this, the whole `obsidian` module is accessible in a JS context at runtime.

``` typescript
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
...
export class SampleCommand extends AbstractCommand {
    constructor(plugin: UserPlugins) {
        super(plugin);
    }
    id: string = 'sample';
    name: string = 'sample';
    callback(): Promise<void> {
        const item = this.plugin.addStatusBarItem();
        this.plugin.passedModules.obsidian.setIcon(item, 'info');  // Oh yeah, this works ! 🎉
        return Promise.resolve();
    }
}
```

## Contributing

### Commit message format

The commit message must follow the [AngularJS Commit Message Format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) and versions are automatically generated following the [Semantic Versioning](https://semver.org/) rules.