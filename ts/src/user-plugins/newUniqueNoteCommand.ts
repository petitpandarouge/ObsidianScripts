import { DateService } from "@obsidian/infrastructure/dateService";
import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { Plugin } from '@obsidian/user-plugins/plugin';

export class NewUniqueNoteCommand extends AbstractCommand {
    constructor(plugin: Plugin, private dateService: DateService) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder-V2';
    name: string = 'V2 - Create new unique note in folder of the center panel active note';
    callback(): Promise<void> {
        const uniqueName = this.dateService.now().format('YYYYMMDDHHmm');
        try {
            this.plugin.app.vault.create(uniqueName,"");
        } catch (error) {
            this.plugin.app.vault.create((parseInt(uniqueName)+1).toString(),"");
        }
        return Promise.resolve();
    }
}