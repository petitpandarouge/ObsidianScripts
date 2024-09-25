# ObsidianScripts 📜

This is the name I use to identify the very first scripts I have written to inflate Obsidian.
They are written in JS, and can be opened using the `ObsidianScripts.code-workspace` file.

It's a good version to work with, but I'm now afraid of modifying them and break something as they are not protected by tests.
This is where `Obsinflate` comes into the game.

I keep them here as I slowly but surely move them into the `Obsinflate` framework.

# Obsinflate 🎈

[![Test](https://github.com/petitpandarouge/ObsidianScripts/workflows/Build%20and%20test%20project/badge.svg)](https://github.com/petitpandarouge/ObsidianScripts/actions?query=workflow%3A%22Build+and+test+project%22) 

TypeScript framework that allows building extension scripts for the following Obsidian plugins : 
- [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
- [User Plugins](https://github.com/mnowotnik/obsidian-user-plugins)
- [Quick Add](https://quickadd.obsidian.guide/docs/)

The benefits of this framework are
- having a fully tested code, to easely **maintain** it,
- having a fully typed code, to easely **read** it.

The framework is implemented following the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) method. The tests are then the [specs](https://html-preview.github.io/?url=https://github.com/petitpandarouge/ObsidianScripts/blob/main/obsinflate/reports/test-report.html) 🔥.

## Building and bundling

`git clone` this repo and execute the following commands:

``` sh
cd obsinflate
npm install
npm run build
npm run bundle
```

Resulting bundles are generated into the `bundles` directory.

## Implementing

The source code is organized as follow:
- `src`: Contains Obsidian extensions classes and common utility classes.
- `src/user-plugins`: Contains the User Plugins plugin specific sources.
- `src/quick-add`: Contains the QuickAdd plugin specific sources.
- `src/dataview`: Contains the Dataview plugin specific sources.
- `src/infrastructure`: Contains the code that does not need to be tested. Mainly wrapper services used to make the code testable using the dependency injection.

### User Plugins

- The entry point is represented by the `main.ts` file that must contains an `onload` function. 
- The `CommandLoader` is the main class responsible for loading the commands into the `Plugin`.

``` typescript
export async function onload(plugin: UserPlugins): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new HelloWorldCommand(plugin),
        ...
    ]);
}
```

- A command must implement an `AbstractCommand`.
- The command logique is in the `callback` function.

``` typescript
export class HelloWorldCommand extends AbstractCommand<UserPlugins> {
    constructor(plugin: UserPlugins) {
        super(plugin);
    }
    id: string = "hello-world";
    name: string = "Hello World";
    callback(): Promise<void> {
        new NoticeWrapper("Hello World !", 5000)
        return Promise.resolve();
    }
}
```

### QuickAdd

One ts file must contain only one script that can be implemented using two ways.

#### Script type

- Using the `Script` type, a script must be implemented as follow.

``` typescript
const helloWorld: Script = async () => {
    new Notice("Hello World !", 5000)
    return Promise.resolve();
}
```

- The script must be exported using the `module.exports` directive.

``` typescript
module.exports = helloWorld;
```

#### SettingizedScript interface

- This interface `SettingizedScript` must be implemented to implement a script having UI settings.

``` typescript
class HelloWorld implements SettingizedScript {
    entry(_params: Parameters, settings: {[key: string]: string | boolean}): Promise<void> {
        new Notice(`Hello ${settings["Name"]} !`, 5000)
        return Promise.resolve();
    }
    settings = {
        name: "Hello World",
        author: "me",
        options: {
            Name: {
                type: "text" as TextFieldType,
                description: "The name to say hello",
                defaultValue: "World",
                placeholder: "World"
            }
        }
    }
}
```

- The script is exported by exporting an instance of the created class.

``` typescript
module.exports = new HelloWorld();
```

### Dataview

#### View

Implementing a view relies on implementing the `ViewBuilder`.

##### View without input

- View without parameter implements `ViewBuilder<never>`.

``` javascript
export class HelloWorld implements ViewBuilder<never> {
    build(dv: DataviewApi) {
        dv.header(1, "Hello World");
        dv.table(
            ["Name", "Ids"], 
            [
                ["Me", 0]
            ]
        );
    }
}
```

##### View with input

- Inputs can be explicitely defined using a class.

``` javascript
class Input {
    name!: string;
} 
```

- Implementing `ViewBuilder<Input>` makes the inputs available to the view.

``` javascript
export class HelloWorld implements ViewBuilder<Input> {
    build(dv: DataviewApi, input: Input) {
        const header = input.name ? `Hello ${input.name}` : "Hello World";
        dv.header(1, header);
        dv.table(
            ["Name", "Ids"], 
            [
                ["Me", 0]
            ]
        );
    }
}
```

## Testing and debugging

### Unit tests

The `__tests__` directory contains all the framework unit tests and relative sources.

🚧 To be written (VS Code and javascript debug console).

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

## Deploying

🚧 The command is currently in build state but I plan to build a command that deploys the scripts into a vault directory.
