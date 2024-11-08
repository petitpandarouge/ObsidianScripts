import { TextFieldType } from '@obsinflate/api/quick-add/settings/textField';
import { ME } from '@obsinflate/inflates/constants';

export class SettingsFieldsNames {
    static BookTitleVariableName = 'Output - Book Title Variable Name';
    static BookAuthorVariableName = 'Output - Book Author Variable Name';
    static BookAnnotationsVariableName =
        'Output - Book Annotations Variable Name';
}

export const SettingsDefinition = {
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
