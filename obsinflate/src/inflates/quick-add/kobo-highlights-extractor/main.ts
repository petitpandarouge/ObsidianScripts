import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { AnnotationsMarkdownFormatter } from '@obsinflate/core/adobe-digital-editions/annotationsMarkdownFormatter';
import { AnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { AnnotationsSorter } from '@obsinflate/core/adobe-digital-editions/annotationsSorter';
import { KoboHighlightsExtractor } from '@obsinflate/inflates/quick-add/kobo-highlights-extractor/script';
import {
    KoboHighlightsImporterSettings,
    SettingsDefinition
} from '@obsinflate/inflates/quick-add/kobo-highlights-extractor/settings';
import { AnnotationsReader } from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { Annotations } from '@obsinflate/core/adobe-digital-editions/annotations';
import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder =
            new SettingsBuilder<KoboHighlightsImporterSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const xmlReader = new XmlParser<Annotations>();
        const annotationsReader = new AnnotationsReader(xmlReader);
        const annotationsSorter = new AnnotationsSorter();
        const annotationsMerger = new AnnotationsMerger(annotationsSorter);
        const annotationsFormatter = new AnnotationsMarkdownFormatter();
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition),
            annotationsReader,
            annotationsMerger,
            annotationsFormatter
        );
        await extractor.entry(params);
    }

    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
