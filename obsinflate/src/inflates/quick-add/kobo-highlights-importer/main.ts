import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { AnnotationsMarkdownFormatter } from '@obsinflate/core/adobe-digital-editions/annotationsMarkdownFormatter';
import { AnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { AnnotationsSorter } from '@obsinflate/core/adobe-digital-editions/annotationsSorter';
import {
    KoboHighlightsImporter,
    SettingsFieldsNames
} from '@obsinflate/inflates/quick-add/kobo-highlights-importer/script';
import { AnnotationsReader } from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';
import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { Annotations } from '@obsinflate/core/adobe-digital-editions/annotations';
import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { ME } from '@obsinflate/inflates/constants';
import { TextFieldType } from '@obsinflate/api/quick-add/settings/textField';

export class main implements SettingableScriptEntryPoint {
    public async entry(params: Parameters, settings: Settings): Promise<void> {
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
            settings,
            fileSystem,
            annotationsReader,
            annotationsMerger,
            annotationsFormatter
        );
        await importer.entry(params);
    }

    settings = {
        name: 'Kobo Highlights Importer',
        author: ME,
        options: {
            [SettingsFieldsNames.BookTitleVariableName]: {
                type: 'text' as TextFieldType,
                defaultValue: 'title'
            },
            [SettingsFieldsNames.BookAuthorVariableName]: {
                type: 'text' as TextFieldType,
                defaultValue: 'author'
            },
            [SettingsFieldsNames.BookAnnotationsVariableName]: {
                type: 'text' as TextFieldType,
                defaultValue: 'annotations'
            }
        }
    };
}

module.exports = new main();
