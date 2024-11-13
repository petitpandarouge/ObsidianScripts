import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface VariableFormatterSettings {
    valueVariableName: string;
    format: string;
    formattedValueVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Variables Formatter')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<VariableFormatterSettings>((s) => s.valueVariableName),
        label: 'Input - Value Variable Name',
        defaultValue: 'value'
    })
    .havingTextFieldOption({
        name: nameof<VariableFormatterSettings>((s) => s.format),
        label: 'Format',
        defaultValue: '{{value}}'
    })
    .havingTextFieldOption({
        name: nameof<VariableFormatterSettings>(
            (s) => s.formattedValueVariableName
        ),
        label: 'Output - Formatted Value Variable Name',
        defaultValue: 'formattedValue'
    })
    .build();
