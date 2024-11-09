# Module functions considerations 🧠

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
