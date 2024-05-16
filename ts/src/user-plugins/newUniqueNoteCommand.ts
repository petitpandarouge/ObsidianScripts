import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';

export class NewUniqueNoteCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder';
    name: string = 'Create new unique note in folder of the center panel active note';
    callback(): Promise<void> {
        this.plugin.app.vault.create("","");
        return Promise.resolve();
    }
}