import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';
import { INoticer } from '@obsinflate/infrastructure/noticer';
import { ErrorNoticer } from '@obsinflate/errorNoticer';

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
