import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';
import { INoticer } from '@obsinflate/infrastructure/noticer';

export class HelloWorldCommand extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        private noticer: INoticer
    ) {
        super(plugin);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    callback(): Promise<void> {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}
