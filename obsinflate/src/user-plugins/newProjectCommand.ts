import { AbstractPlugin } from '@obsinflate/abstractPlugin';
import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';

export class NewProjectCommand extends AbstractCommand {
    constructor(plugin: AbstractPlugin) {
        super(plugin);
    }
    id: string = 'new-project-from-empty-note-V2';
    name: string = 'V2 - Create new project structure from empty note';
    callback(): Promise<void> {
        return Promise.resolve();
    }
}
