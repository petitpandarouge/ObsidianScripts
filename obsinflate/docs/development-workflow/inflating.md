# Inflating 🎈

The source code is organized as follow:
- `api`: Interfaces and extensions wrapping the Obsidian and plugins API calls.
- `core`: The obsinflate framework implementations.
- `infrastructure`: Technical services mainly here to make the Obsinflate code testable using the dependency injection.
- `hello-world`: Samples.
- `inflates`: The inflates implementations.

## UserPlugins 🧩

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

## QuickAdd 🧩

One ts file must contain only one script that can be implemented using two ways.

### Script without settings

- Using the `AbstractScript` class, a script must be implemented as follow.

https://github.com/petitpandarouge/ObsidianScripts/blob/6c7c3737ad0715bafc6050b8f9af89452048e8bd/obsinflate/src/hello-world/quick-add/script.ts#L7-L18

- The script can be initialized and exported using the `module.exports` directive.

https://github.com/petitpandarouge/ObsidianScripts/blob/6c7c3737ad0715bafc6050b8f9af89452048e8bd/obsinflate/src/hello-world/quick-add/script.ts#L20-L27

### Script with settings

- The script settings is a basic interface containing only first level properties.

https://github.com/petitpandarouge/ObsidianScripts/blob/85bfbba16c13dc24637b659baae8c3808b14a627/obsinflate/src/hello-world/quick-add/settingableScript.ts#L11-L13

- Using the `SettingsDefinitionBuilder`, you can define the corresponding UI definition.

https://github.com/petitpandarouge/ObsidianScripts/blob/85bfbba16c13dc24637b659baae8c3808b14a627/obsinflate/src/hello-world/quick-add/settingableScript.ts#L15-L23

> ⚠️ The `name` property of each option must reference the name of one of the properties defined in the previous setting interface. This is how the mapping is done between the UI definition and the settings finaly given to the script.

- The script implementation is done using the `AbstractSettingableScript`.

https://github.com/petitpandarouge/ObsidianScripts/blob/85bfbba16c13dc24637b659baae8c3808b14a627/obsinflate/src/hello-world/quick-add/settingableScript.ts#L25-L37

> ⚠️ Notice the settings given as constructor parameter.

- Finally, the entry point is implemented using the `SettingableScriptEntryPoint` interface.

https://github.com/petitpandarouge/ObsidianScripts/blob/85bfbba16c13dc24637b659baae8c3808b14a627/obsinflate/src/hello-world/quick-add/settingableScript.ts#L39-L54

> ⚠️ `SettingsBuilder` class is used to map the native setting to the specific settings interface.

> ⚠️ Notice that the `settings` property is never referenced as `this.settings` in the `entry`method. This would not work. At runtime, the entry point is not considered as a class but as a javascript object, and `this` does not exist. This is why `SettingsDefinition` is used twice.

## Dataview 🧩

### View

Implementing a view relies on implementing two interfaces: `View` and `ViewBuilder`.

#### View without input

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

#### View with input

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
