import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { UniqueNoteCreator } from '@obsinflate/core/uniqueNoteCreator';
import { AnnotationsMarkdownFormatter } from '@obsinflate/inflates/quick-add/annotationsMarkdownFormatter';
import { KoboHighlightsImporter } from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import { AnnotationsReader } from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const fileSystem = new FileSystem();
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const annotationsReader = new AnnotationsReader();
    const annotationsFormatter = new AnnotationsMarkdownFormatter();
    const dateTimeProvider = new DateTimeProvider();
    const uniqueNameGenerator = new UniqueNameGenerator(dateTimeProvider);
    const uniqueNoteCreator = new UniqueNoteCreator(
        uniqueNameGenerator,
        params.app
    );
    const importer = new KoboHighlightsImporter(
        fileSystem,
        errorNoticer,
        annotationsReader,
        annotationsFormatter,
        uniqueNoteCreator
    );
    await importer.entry(params);
};

module.exports = entryPoint;
