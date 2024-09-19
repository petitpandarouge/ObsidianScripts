import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';

export class NewProjectCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = "new-project-from-empty-note-V2";
    name: string = "V2 - Create new project structure from empty note";
    callback(): Promise<void> {
        return Promise.resolve();
    }
}