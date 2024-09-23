import { DateService } from '@obsinflate/infrastructure/dateService';
import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';

export class NewUniqueNoteCommand extends AbstractCommand {
    constructor(
        plugin: Plugin,
        private dateService: DateService
    ) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder-V2';
    name: string =
        'V2 - Create new unique note in folder of the center panel active note';
    async callback(): Promise<void> {
        const dateFormat = 'YYYYMMDDHHmm';
        const minutes = 'minutes';
        const now = this.dateService.now();
        let created = false;
        do {
            try {
                const uniqueName = now.format(dateFormat);
                await this.plugin.app.vault.create(uniqueName, '');
                created = true;
            } catch {
                now.add(1, minutes);
            }
        } while (!created);
    }
}
