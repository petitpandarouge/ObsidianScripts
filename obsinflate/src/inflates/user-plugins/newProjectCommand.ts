import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

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
