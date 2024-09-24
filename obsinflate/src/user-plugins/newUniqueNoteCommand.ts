import { IDateTimeService } from '@obsinflate/infrastructure/dateTimeService';
import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';

export class NewUniqueNoteCommand extends AbstractCommand {
    constructor(
        plugin: Plugin,
        private dateTimeService: IDateTimeService
    ) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder-V2';
    name: string =
        'V2 - Create new unique note in folder of the center panel active note';
    async callback(): Promise<void> {
        const dateFormat = 'YYYYMMDDHHmm';
        const now = this.dateTimeService.now();
        let created = false;
        do {
            try {
                const uniqueName = now.toFormat(dateFormat);
                await this.plugin.app.vault.create(uniqueName, '');
                created = true;
            } catch {
                now.plus({ minutes: 1 });
            }
        } while (!created);
    }
}
