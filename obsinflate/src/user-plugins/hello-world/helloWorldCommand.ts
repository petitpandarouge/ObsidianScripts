import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Notice } from 'obsidian';
import { Plugin } from 'obsidian';

export class HelloWorldCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    callback(): Promise<void> {
        new Notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
