import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface NotePropertyUpdaterSettings {
    propertyValueVariableName: string;
    propertyNameVariableName: string;
    notePathVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Note Property Updater')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<NotePropertyUpdaterSettings>(
            (s) => s.propertyNameVariableName
        ),
        label: 'Input - Property Name Variable Name',
        defaultValue: 'propertyName'
    })
    .havingTextFieldOption({
        name: nameof<NotePropertyUpdaterSettings>(
            (s) => s.propertyValueVariableName
        ),
        label: 'Input - Property Value Variable Name',
        defaultValue: 'value'
    })
    .havingTextFieldOption({
        name: nameof<NotePropertyUpdaterSettings>(
            (s) => s.notePathVariableName
        ),
        label: 'Input - Note Path Variable Name',
        defaultValue: 'notePath'
    })
    .build();
