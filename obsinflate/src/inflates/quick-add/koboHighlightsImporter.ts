import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { IFileSystem, File } from '@obsinflate/infrastructure/fileSystem';
import { NoAnnotationsFileSelectedError } from '@obsinflate/inflates/quick-add/noAnnotationsFileSelectedError';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { IAnnotationsReader } from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { IFormatter } from '@obsinflate/infrastructure/formatter';
import { EpubFiles } from '@obsinflate/core/adobe-digital-editions/epubFile';
import { IAnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';

export const ANNOTATIONS_FILES_DIR_PATH = 'D:/Digital Editions/Annotations';
export const ANNOTATIONS_FILE_EXTENSION = '.annot';
export const BOOK_TITLE_VAR_NAME = 'title';
export const BOOK_AUTHOR_VAR_NAME = 'author';
export const BOOK_ANNOTATIONS_VAR_NAME = 'annotations';

// TODO : Using error noticer should be part of the core logic
export class KoboHighlightsImporter implements Script {
    constructor(
        private fileSystem: IFileSystem,
        private errorNoticer: ErrorNoticer,
        private annotationsReader: IAnnotationsReader,
        private annotationsMerger: IAnnotationsMerger,
        private annotationsFormatter: IFormatter<EpubFiles>
    ) {}

    async entry(params: Parameters): Promise<void> {
        await this.errorNoticer.wrap(async () => await this.innerEntry(params));
    }

    private async innerEntry(params: Parameters): Promise<void> {
        const files = await this.fileSystem.getFiles(
            ANNOTATIONS_FILES_DIR_PATH
        );
        const selectedFile = await this.suggest(params, files);
        const annotations = await this.annotationsReader.read(selectedFile);
        const annotationsByFiles = this.annotationsMerger.merge(
            annotations.annotationSet.annotations
        );
        const content = this.annotationsFormatter.format(annotationsByFiles);
        // TODO : Needs to be formated
        params.variables[BOOK_TITLE_VAR_NAME] =
            annotations.annotationSet.publication.title;
        params.variables[BOOK_AUTHOR_VAR_NAME] =
            annotations.annotationSet.publication.creator;
        params.variables[BOOK_ANNOTATIONS_VAR_NAME] = content;
    }

    private async suggest(params: Parameters, files: File[]): Promise<File> {
        const displayItems: string[] = files.map((file) => file.name);
        const actualItems: string[] = files.map((file) => file.path);
        const selectedFilePath = await params.quickAddApi.suggester(
            displayItems,
            actualItems
        );
        if (selectedFilePath === undefined) {
            throw new NoAnnotationsFileSelectedError();
        }
        return files.find((file) => file.path === selectedFilePath)!;
    }
}
