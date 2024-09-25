import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';
import { Notice } from 'obsidian';

export class HelloWorldCommand extends AbstractCommand<UserPlugins> {
    constructor(plugin: UserPlugins) {
        super(plugin);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    callback(): Promise<void> {
        new Notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
