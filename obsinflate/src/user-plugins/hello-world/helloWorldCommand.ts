import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';
import { NoticeWrapper } from '@obsidian/noticeWrapper';

export class HelloWorldCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = "hello-world";
    name: string = "Hello World";
    callback(): Promise<void> {
        new NoticeWrapper("Hello World !", 5000)
        return Promise.resolve();
    }
}