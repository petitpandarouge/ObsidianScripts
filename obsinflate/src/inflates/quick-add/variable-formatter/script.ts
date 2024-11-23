import { AbstractSettingableScript } from '@obsinflate/core/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { VariableFormatterSettings } from '@obsinflate/inflates/quick-add/variable-formatter/settings';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Formatter } from '@obsinflate/infrastructure/formatter';
import { EmptyFormatError } from '@obsinflate/inflates/quick-add/variable-formatter/emptyFormatError';

interface VariableValue {
    value: unknown;
}

export class VariablesFormatter extends AbstractSettingableScript<VariableFormatterSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: VariableFormatterSettings
    ) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        const input = this.secureGetVariable(
            params,
            this.settings.valueVariableName
        );
        // Process
        if (!this.settings.format) {
            throw new EmptyFormatError();
        }
        const formatter = new Formatter<VariableValue>(this.settings.format);
        const formatedValue = formatter.format({ value: input });
        // Output
        params.variables[this.settings.formattedValueVariableName] =
            formatedValue;
    }
}
