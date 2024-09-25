import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { IUniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { AbstractCommand } from '@obsinflate/abstractCommand';

export class NewUniqueNoteCommand extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        private nameGenerator: IUniqueNameGenerator
    ) {
        super(plugin);
    }
    id: string = 'new-unique-note-in-current-folder-V2';
    name: string =
        'V2 - Create new unique note in folder of the center panel active note';
    async callback(): Promise<void> {
        let created = false;
        do {
            try {
                const uniqueName = this.nameGenerator.generateFromNow();
                await this.plugin.app.vault.create(uniqueName, '');
                created = true;
            } catch {
                // Vault create raises an error if the file already exists
            }
        } while (!created);
    }
}
