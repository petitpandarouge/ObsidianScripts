import { AbstractScript } from '@obsinflate/core/quick-add/abstractScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

export abstract class AbstractSettingableScript<
    TSettings
> extends AbstractScript {
    constructor(
        errorNoticer: ErrorNoticer,
        protected settings: TSettings
    ) {
        super(errorNoticer);
    }
}
