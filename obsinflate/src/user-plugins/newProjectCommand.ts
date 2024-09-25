import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';

export class NewProjectCommand extends AbstractCommand<UserPlugins> {
    constructor(plugin: UserPlugins) {
        super(plugin);
    }
    id: string = 'new-project-from-empty-note-V2';
    name: string = 'V2 - Create new project structure from empty note';
    callback(): Promise<void> {
        return Promise.resolve();
    }
}
