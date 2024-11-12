import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { StringVariableSetterSettings } from './settings';
import { Parameters } from '@obsinflate/api/quick-add/parameters';

export class StringVariableSetter extends AbstractSettingableScript<StringVariableSetterSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: StringVariableSetterSettings
    ) {
        super(errorNoticer, settings);
    }

    innerEntry(params: Parameters): Promise<void> {
        // Output
        params.variables[this.settings.variableName] = this.settings.value;
        return Promise.resolve();
    }
}
