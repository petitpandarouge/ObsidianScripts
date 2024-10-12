import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { IFileSystem } from '@obsinflate/infrastructure/fileSystem';
import { NoAnnotationsFileSelectedError } from '@obsinflate/inflates/quick-add/noAnnotationsFileSelectedError';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

export const ANNOTATIONS_FILES_DIR_PATH = 'D:/Digital Editions/Annotations';
export const ANNOTATIONS_FILE_EXTENSION = '.annot';

export class KoboHighlightsImporter implements Script {
    constructor(
        private fileSystem: IFileSystem,
        private errorNoticer: ErrorNoticer
    ) {}

    async entry(params: Parameters): Promise<void> {
        await this.errorNoticer.wrap(async () => await this.innerEntry(params));
    }

    async innerEntry(params: Parameters): Promise<void> {
        const files = await this.fileSystem.getFiles(
            ANNOTATIONS_FILES_DIR_PATH
        );
        const displayItems: string[] = files.map((file) => file.name);
        const actualItems: string[] = files.map((file) => file.path);
        const selectedFile = await params.quickAddApi.suggester(
            displayItems,
            actualItems
        );
        if (selectedFile === undefined) {
            throw new NoAnnotationsFileSelectedError();
        }
    }
}
