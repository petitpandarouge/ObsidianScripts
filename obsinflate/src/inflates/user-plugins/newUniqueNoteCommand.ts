import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import { IAppExtension } from '@obsinflate/api/obsidian/appExtension';
import path from 'path';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { MaxNoteCreationAttempsReachedError } from '@obsinflate/inflates/user-plugins/maxNoteCreationAttempsReachedError';
import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { TFile } from 'obsidian';
import { OpenViewStateBuilder } from '@obsinflate/api/obsidian/openViewStateBuilder';

export const NO_DATA = '';
export const MAX_NOTE_CREATION_ATTEMPS = 10;

export class NewUniqueNoteCommand extends AbstractCommand<UserPlugins> {
    constructor(
        plugin: UserPlugins,
        errorNoticer: ErrorNoticer,
        private nameGenerator: IUniqueNameGenerator,
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
        const createdNote = await this.createUniqueNoteIn(newNoteFolderPath);
        activeLeaf.native.openFile(
            createdNote,
            OpenViewStateBuilder.create()
                .inSourceMode()
                .withFocusAtTheEndOfTitleView()
                .build()
        );
    }

    private async createUniqueNoteIn(folderPath: string): Promise<TFile> {
        let created = false;
        let attempts = 0;
        let createdFile: TFile | null = null;
        const seed = this.nameGenerator.generateNewSeed();
        do {
            const uniqueName = seed.next();
            const noteName = `${uniqueName}.${MARKDOWN_FILE_EXTENSION}`;
            const noteFullPath = path.join(folderPath, noteName);
            try {
                attempts++;
                createdFile = await this.plugin.app.vault.create(
                    noteFullPath,
                    NO_DATA
                );
                created = true;
            } catch {
                // Vault create raises an error if the file already exists
                if (attempts >= MAX_NOTE_CREATION_ATTEMPS) {
                    throw new MaxNoteCreationAttempsReachedError(
                        MAX_NOTE_CREATION_ATTEMPS
                    );
                }
            }
        } while (!created);
        return createdFile!;
    }
}
