import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface KoboHighlightsImporterSettings {
    BookTitleVariableName: string;
    BookAuthorVariableName: string;
    BookAnnotationsVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Kobo Highlights Importer')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.BookTitleVariableName
        ),
        label: 'Output - Book Title Variable Name',
        defaultValue: 'title'
    })
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.BookAuthorVariableName
        ),
        label: 'Output - Book Author Variable Name',
        defaultValue: 'author'
    })
    .havingTextFieldOption({
        name: nameof<KoboHighlightsImporterSettings>(
            (s) => s.BookAnnotationsVariableName
        ),
        label: 'Output - Book Annotations Variable Name',
        defaultValue: 'annotations'
    })
    .build();
