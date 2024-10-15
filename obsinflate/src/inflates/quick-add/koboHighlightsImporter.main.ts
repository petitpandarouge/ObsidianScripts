import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { AnnotationToMarkdownQuoteFormatter } from '@obsinflate/inflates/quick-add/annotationToMarkdownQuoteFormatter';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { AnnotationsReader } from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const fileSystem = new FileSystem();
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const annotationsReader = new AnnotationsReader();
    const markdownQuoteFormatter = new AnnotationToMarkdownQuoteFormatter();
    const importer = new KoboHighlightsImporter(
        fileSystem,
        errorNoticer,
        annotationsReader,
        markdownQuoteFormatter
    );
    await importer.entry(params);
};

module.exports = entryPoint;
