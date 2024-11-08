import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { AnnotationsMarkdownFormatter } from '@obsinflate/core/adobe-digital-editions/annotationsMarkdownFormatter';
import { AnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { AnnotationsSorter } from '@obsinflate/core/adobe-digital-editions/annotationsSorter';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/kobo-highlights-importer/script';
import { AnnotationsReader } from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';
import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { Annotations } from '@obsinflate/core/adobe-digital-editions/annotations';
import { Settings } from '@obsinflate/inflates/quick-add/kobo-highlights-importer/settings';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const fileSystem = new FileSystem();
    const xmlReader = new XmlParser<Annotations>();
    const annotationsReader = new AnnotationsReader(xmlReader);
    const annotationsSorter = new AnnotationsSorter();
    const annotationsMerger = new AnnotationsMerger(annotationsSorter);
    const annotationsFormatter = new AnnotationsMarkdownFormatter();
    const importer = new KoboHighlightsImporter(
        errorNoticer,
        // TODO to replace by the good one
        {
            BookTitleVariableName: 'title',
            BookAuthorVariableName: 'author',
            BookAnnotationsVariableName: 'annotations'
        } as Settings,
        fileSystem,
        annotationsReader,
        annotationsMerger,
        annotationsFormatter
    );
    await importer.entry(params);
};

module.exports = entryPoint;
