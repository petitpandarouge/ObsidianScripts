import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface VariablesMapperSettings {
    inputVariableName: string;
    outputVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Variables Mapper')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<VariablesMapperSettings>((s) => s.inputVariableName),
        label: 'Input Variable Name',
        defaultValue: 'input'
    })
    .havingTextFieldOption({
        name: nameof<VariablesMapperSettings>((s) => s.outputVariableName),
        label: 'Output Variable Name',
        defaultValue: 'output'
    })
    .build();
