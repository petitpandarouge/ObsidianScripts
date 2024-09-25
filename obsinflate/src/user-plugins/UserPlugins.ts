import { App, Plugin, PluginManifest } from 'obsidian';
import * as obsidian from 'obsidian';

class Modules {
    obsidian: typeof obsidian = obsidian;
}

/**
 * v1.3.0
 * https://github.com/mnowotnik/obsidian-user-plugins/tree/master
 */
export abstract class UserPlugins extends Plugin {
    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.passedModules = new Modules();
    }
    passedModules: Modules;
}
