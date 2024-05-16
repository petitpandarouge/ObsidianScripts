import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';

export class NewProjectCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = "new-project-from-empty-note";
    name: string = "Create new project structure from empty note";
    callback(): Promise<void> {
        return Promise.resolve();
    }
}