import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { VariableNotDefinedError } from '@obsinflate/core/quick-add/variableNotDefinedError';

export abstract class AbstractScript implements Script {
    constructor(private errorNoticer: ErrorNoticer) {}

    async entry(params: Parameters): Promise<void> {
        await this.errorNoticer.wrap(async () => await this.innerEntry(params));
    }

    protected abstract innerEntry(params: Parameters): Promise<void>;

    protected secureGetVariable<TValue>(
        params: Parameters,
        variableName: string
    ): TValue {
        if (
            !Object.prototype.hasOwnProperty.call(
                params.variables,
                variableName
            )
        ) {
            throw new VariableNotDefinedError(variableName);
        }
        return params.variables[variableName] as TValue;
    }
}
