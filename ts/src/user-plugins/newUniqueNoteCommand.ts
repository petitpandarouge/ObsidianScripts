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
        const dateFormat = "YYYYMMDDHHmm";
        const minutes = "minutes";
        const now = this.dateService.now();
        let created = false;
        do {
            try {
                let uniqueName = now.format(dateFormat);
                this.plugin.app.vault.create(uniqueName,"");
                created = true;
            } catch (error) {
                now.add(1, minutes);
            }
        } while (!created);
        return Promise.resolve();
    }
}