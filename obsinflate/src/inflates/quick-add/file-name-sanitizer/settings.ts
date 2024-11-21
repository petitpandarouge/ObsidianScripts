import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { ME } from '@obsinflate/inflates/constants';
import { nameof } from 'ts-simple-nameof';

export interface FileNameSanitizerSettings {
    fileNameVariableName: string;
    sanitizedFileNameVariableName: string;
}

export const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('File Name Sanitizer')
    .implementedBy(ME)
    .havingTextFieldOption({
        name: nameof<FileNameSanitizerSettings>((s) => s.fileNameVariableName),
        label: 'Input - File Name Variable Name',
        defaultValue: 'fileName'
    })
    .havingTextFieldOption({
        name: nameof<FileNameSanitizerSettings>(
            (s) => s.sanitizedFileNameVariableName
        ),
        label: 'Output - Sanitized File Name Variable Name',
        defaultValue: 'sanitizedFileName'
    })
    .build();
