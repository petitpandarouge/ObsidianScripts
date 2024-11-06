import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

export abstract class AbstractScript implements Script {
    constructor(private errorNoticer: ErrorNoticer) {}

    async entry(params: Parameters): Promise<void> {
        await this.errorNoticer.wrap(async () => await this.innerEntry(params));
    }

    protected abstract innerEntry(params: Parameters): Promise<void>;
}
