import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { AbstractCommand } from '@obsinflate/core/obsidian/abstractCommand';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

export class HelloWorldCommand extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        errorNoticer: ErrorNoticer,
        private noticer: INoticer
    ) {
        super(plugin, errorNoticer);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    protected innerCallback(): Promise<void> {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
