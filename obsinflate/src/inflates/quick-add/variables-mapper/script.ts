import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { VariablesMapperSettings } from './settings';
import { Parameters } from '@obsinflate/api/quick-add/parameters';

export class VariablesMapper extends AbstractSettingableScript<VariablesMapperSettings> {
    constructor(errorNoticer: ErrorNoticer, settings: VariablesMapperSettings) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        const input = this.secureGetVariable(
            params,
            this.settings.inputVariableName
        );
        // Output
        params.variables[this.settings.outputVariableName] = input;
    }
}
