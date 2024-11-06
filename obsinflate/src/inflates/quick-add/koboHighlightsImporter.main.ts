import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { AnnotationsMarkdownFormatter } from '@obsinflate/core/adobe-digital-editions/annotationsMarkdownFormatter';
import { AnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { AnnotationsSorter } from '@obsinflate/core/adobe-digital-editions/annotationsSorter';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { AnnotationsReader } from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const fileSystem = new FileSystem();
    const annotationsReader = new AnnotationsReader();
    const annotationsSorter = new AnnotationsSorter();
    const annotationsMerger = new AnnotationsMerger(annotationsSorter);
    const annotationsFormatter = new AnnotationsMarkdownFormatter();
    const importer = new KoboHighlightsImporter(
        errorNoticer,
        fileSystem,
        annotationsReader,
        annotationsMerger,
        annotationsFormatter
    );
    await importer.entry(params);
};

module.exports = entryPoint;
