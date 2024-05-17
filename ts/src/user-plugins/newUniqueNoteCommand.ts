import { UniqueNameGenerator } from "@obsidian/uniqueNameGenerator";
import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';

export class NewUniqueNoteCommand extends AbstractCommand {
    constructor(plugin: Plugin, private uniqueNameGenerator: UniqueNameGenerator) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder';
    name: string = 'Create new unique note in folder of the center panel active note';
    callback(): Promise<void> {
        const uniqueName = this.uniqueNameGenerator.generate();
        this.plugin.app.vault.create(uniqueName,"");
        return Promise.resolve();
    }
}