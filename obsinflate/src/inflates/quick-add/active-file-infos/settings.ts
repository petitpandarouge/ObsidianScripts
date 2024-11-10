import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface ActiveFileInfosSettings {
    basenameVariableName: string;
    pathVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Active File Infos')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<ActiveFileInfosSettings>((s) => s.basenameVariableName),
        label: 'Output - Basename Variable Name',
        defaultValue: 'activeFileBasename'
    })
    .havingTextFieldOption({
        name: nameof<ActiveFileInfosSettings>((s) => s.pathVariableName),
        label: 'Output - Path Variable Name',
        defaultValue: 'activeFilePath'
    })
    .build();
