import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { MaxNoteCreationAttemptsReachedError } from '@obsinflate/core/maxNoteCreationAttemptsReachedError';
import { App, TFile } from 'obsidian';
import path from 'path';

export const NO_DATA = '';
export const MAX_NOTE_CREATION_ATTEMPTS = 10;

export interface IUniqueNoteCreator {
    createUniqueNoteIn(folderPath: string): Promise<TFile>;
}

export class UniqueNoteCreator implements IUniqueNoteCreator {
    constructor(
        private nameGenerator: IUniqueNameGenerator,
        private app: App
    ) {}

    async createUniqueNoteIn(folderPath: string): Promise<TFile> {
        let created = false;
        let attempts = 0;
        let createdFile: TFile | null = null;
        const seed = this.nameGenerator.generateNewSeed();
        do {
            const uniqueName = seed.next();
            const noteName = `${uniqueName}${MARKDOWN_FILE_EXTENSION}`;
            const noteFullPath = path.join(folderPath, noteName);
            try {
                attempts++;
                createdFile = await this.app.vault.create(
                    noteFullPath,
                    NO_DATA
                );
                created = true;
            } catch {
                // Vault create raises an error if the file already exists
                if (attempts >= MAX_NOTE_CREATION_ATTEMPTS) {
                    throw new MaxNoteCreationAttemptsReachedError(
                        MAX_NOTE_CREATION_ATTEMPTS
                    );
                }
            }
        } while (!created);
        return createdFile!;
    }
}
