import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { AbstractCommand } from '@obsinflate/abstractCommand';
import { ErrorNoticer } from '@obsinflate/errorNoticer';

export class NewProjectCommand extends AbstractCommand<UserPlugins> {
    constructor(plugin: UserPlugins, errorNoticer: ErrorNoticer) {
        super(plugin, errorNoticer);
    }
    id: string = 'new-project-from-empty-note-V2';
    name: string = 'V2 - Create new project structure from empty note';
    protected innerCallback(): Promise<void> {
        return Promise.resolve();
    }
}
