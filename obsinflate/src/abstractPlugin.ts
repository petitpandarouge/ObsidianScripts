import { App, Plugin, PluginManifest } from 'obsidian';
import * as obsidian from 'obsidian';

class Modules {
    obsidian: typeof obsidian = obsidian;
}

export abstract class AbstractPlugin extends Plugin {
    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.passedModules = new Modules();
    }
    passedModules: Modules;
}
