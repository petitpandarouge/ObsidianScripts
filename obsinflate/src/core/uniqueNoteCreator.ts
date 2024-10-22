import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { MaxNoteCreationAttemptsReachedError } from '@obsinflate/core/maxNoteCreationAttemptsReachedError';
import { App, TFile } from 'obsidian';
import path from 'path';

export const ROOT_PATH = '';
export const NO_CONTENT = '';
export const NO_BASENAME = '';
export const MAX_NOTE_CREATION_ATTEMPTS = 10;
export const NOTE_NAME_SEPARATOR = ' - ';
export const FILE_ALREADY_EXISTS_ERROR_MESSAGE = 'File already exists.';

export interface IUniqueNoteCreator {
    create(
        folderPath: string,
        basename: string,
        content: string
    ): Promise<TFile>;
}

export class UniqueNoteCreator implements IUniqueNoteCreator {
    constructor(
        private nameGenerator: IUniqueNameGenerator,
        private app: App
    ) {}

    async create(
        folderPath: string,
        basename: string,
        content: string
    ): Promise<TFile> {
        let created = false;
        let attempts = 0;
        let createdFile: TFile | null = null;
        const seed = this.nameGenerator.generateNewSeed();
        do {
            const uniqueName = seed.next();
            const noteName = this.buildNoteName(uniqueName, basename);
            const noteFullPath = path.join(folderPath, noteName);
            try {
                attempts++;
                createdFile = await this.app.vault.create(
                    noteFullPath,
                    content
                );
                created = true;
            } catch (error) {
                if (this.isFileAlreadyExistsError(error)) {
                    this.throwIfMaxNoteCreationAttemptsReached(attempts);
                } else {
                    throw error;
                }
            }
        } while (!created);
        return createdFile!;
    }

    private buildNoteName(uniqueName: string, basename: string): string {
        if (basename) {
            return `${uniqueName}${NOTE_NAME_SEPARATOR}${basename}${MARKDOWN_FILE_EXTENSION}`;
        }
        return `${uniqueName}${MARKDOWN_FILE_EXTENSION}`;
    }

    private isFileAlreadyExistsError(error: any): boolean {
        return (
            error instanceof Error &&
            error.message === FILE_ALREADY_EXISTS_ERROR_MESSAGE
        );
    }

    private throwIfMaxNoteCreationAttemptsReached(attempts: number): void {
        if (attempts >= MAX_NOTE_CREATION_ATTEMPTS) {
            throw new MaxNoteCreationAttemptsReachedError(
                MAX_NOTE_CREATION_ATTEMPTS
            );
        }
    }
}
