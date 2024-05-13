import { Plugin } from '@obsidian/user-plugins/plugin';
import { Command } from '@obsidian/user-plugins/command';

export class PluginLoader {
    #command: Command;
    constructor(command: Command) {
        this.#command = command;
	}

    onload(plugin: Plugin): Promise<void> {
        plugin.addCommand(this.#command);
        return Promise.resolve();
    }
}