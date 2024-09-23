import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';
import { NoticeWrapper } from '@obsinflate/noticeWrapper';

export class HelloWorldCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = 'hello-world';
    name: string = 'Hello World';
    callback(): Promise<void> {
        new NoticeWrapper('Hello World !', 5000);
        return Promise.resolve();
    }
}
