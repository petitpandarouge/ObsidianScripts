import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { AbstractCommand } from '@obsinflate/core/obsidian/abstractCommand';
import { IAppExtension } from '@obsinflate/api/obsidian/appExtension';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { OpenViewStateBuilder } from '@obsinflate/api/obsidian/openViewStateBuilder';
import {
    IUniqueNoteCreator,
    NO_BASENAME,
    NO_CONTENT
} from '@obsinflate/core/uniqueNoteCreator';

export class NewUniqueNote extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        errorNoticer: ErrorNoticer,
        private noteCreator: IUniqueNoteCreator,
        private app: IAppExtension
    ) {
        super(plugin, errorNoticer);
    }

    id: string = 'new-unique-note-in-current-folder-V2';
    name: string =
        'V2 - Create new unique note in folder of the center panel active note';

    protected async innerCallback(): Promise<void> {
        const activeLeaf =
            this.app.workspace.getCenterPanelMarkdownActiveLeaf();
        const newNoteFolderPath = activeLeaf.getFolderPath();
        const createdNote = await this.noteCreator.create(
            newNoteFolderPath,
            NO_BASENAME,
            NO_CONTENT
        );
        activeLeaf.native.openFile(
            createdNote,
            new OpenViewStateBuilder()
                .inSourceMode()
                .withFocusAtTheEndOfTitleView()
                .build()
        );
    }
}
