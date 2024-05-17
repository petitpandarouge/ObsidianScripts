import { Plugin } from '@obsidian/user-plugins/plugin';
import { Command } from '@obsidian/user-plugins/command';

export abstract class AbstractCommand implements Command {
    protected plugin: Plugin;
    constructor(plugin: Plugin) {
        this.plugin = plugin;
    }
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}