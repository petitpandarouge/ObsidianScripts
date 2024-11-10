import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { IAnnotationsReader } from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { IFormatter } from '@obsinflate/infrastructure/formatter';
import { EpubFiles } from '@obsinflate/core/adobe-digital-editions/epubFile';
import { IAnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { KoboHighlightsImporterSettings } from '@obsinflate/inflates/quick-add/kobo-highlights-extractor/settings';
import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { File } from '@obsinflate/infrastructure/fileSystem';

export const ANNOTATIONS_FILES_DIR_PATH = 'D:/Digital Editions/Annotations';

export class KoboHighlightsExtractor extends AbstractSettingableScript<KoboHighlightsImporterSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: KoboHighlightsImporterSettings,
        private annotationsReader: IAnnotationsReader,
        private annotationsMerger: IAnnotationsMerger,
        private annotationsFormatter: IFormatter<EpubFiles>
    ) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        const selectedFile = params.variables[
            this.settings.annotationsFileVariableName
        ] as File;
        // Processing
        const annotations = await this.annotationsReader.read(selectedFile);
        const annotationsByFiles = this.annotationsMerger.merge(
            annotations.annotationSet.annotations
        );
        const content = this.annotationsFormatter.format(annotationsByFiles);
        // Output
        params.variables[this.settings.bookTitleVariableName] =
            annotations.annotationSet.publication.title;
        params.variables[this.settings.bookAuthorVariableName] =
            annotations.annotationSet.publication.creator;
        params.variables[this.settings.bookAnnotationsVariableName] = content;
    }
}
