import { Plugin } from '@obsidian/user-plugins/plugin';
import { AbstractCommand, Constructor as AbstractCommandCtr } from '@obsidian/user-plugins/abstractCommand';

export class PluginLoader<TCommand extends AbstractCommand>{
    #commandCtr: AbstractCommandCtr<TCommand>;
    constructor(commandCtr: AbstractCommandCtr<TCommand>) {
        this.#commandCtr = commandCtr;
    }
    onload(plugin: Plugin): Promise<void> {
        plugin.addCommand(new this.#commandCtr(plugin));
        return Promise.resolve();
    }
}