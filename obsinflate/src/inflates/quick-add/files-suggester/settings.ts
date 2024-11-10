import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface FilesSuggesterSettings {
    directoryPath: string;
    selectedFileVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Files Suggester')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<FilesSuggesterSettings>((s) => s.directoryPath),
        label: 'Input - Directory Path'
    })
    .havingTextFieldOption({
        name: nameof<FilesSuggesterSettings>((s) => s.selectedFileVariableName),
        label: 'Output - Selected File Variable Name',
        defaultValue: 'selectedFile'
    })
    .build();
