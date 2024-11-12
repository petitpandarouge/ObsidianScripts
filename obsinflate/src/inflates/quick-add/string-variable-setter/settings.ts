import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface StringVariableSetterSettings {
    variableName: string;
    value: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('String Variable Setter')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<StringVariableSetterSettings>((s) => s.variableName),
        label: 'Input - Variable Name',
        defaultValue: 'input'
    })
    .havingTextFieldOption({
        name: nameof<StringVariableSetterSettings>((s) => s.value),
        label: 'Input - Value',
        defaultValue: 'output'
    })
    .build();
