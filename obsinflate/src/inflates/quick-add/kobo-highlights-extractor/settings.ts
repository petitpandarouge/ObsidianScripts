import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface KoboHighlightsImporterSettings {
    annotationsFileVariableName: string;
    bookTitleVariableName: string;
    bookAuthorVariableName: string;
    bookAnnotationsVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Kobo Highlights Extractor')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.annotationsFileVariableName
        ),
        label: 'Input - Annotations File Variable Name',
        defaultValue: 'annotationsFile'
    })
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.bookTitleVariableName
        ),
        label: 'Output - Book Title Variable Name',
        defaultValue: 'title'
    })
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.bookAuthorVariableName
        ),
        label: 'Output - Book Author Variable Name',
        defaultValue: 'author'
    })
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.bookAnnotationsVariableName
        ),
        label: 'Output - Book Annotations Variable Name',
        defaultValue: 'annotations'
    })
    .build();
