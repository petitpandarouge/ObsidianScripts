import { Plugin } from '@obsidian/user-plugins/plugin';
import { AbstractCommand } from '@obsidian/user-plugins/abstractCommand';

export abstract class AbstractPluginLoader{
    abstract buildCommand(plugin: Plugin): AbstractCommand;
    load(plugin: Plugin): Promise<void> {
        plugin.addCommand(this.buildCommand(plugin));
        return Promise.resolve();
    }
}