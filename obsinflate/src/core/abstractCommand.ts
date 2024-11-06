import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Identifiable } from '@obsinflate/core/identifiable';
import { Command, Plugin } from 'obsidian';

// TODO obsidian
export abstract class AbstractCommand<TPlugin extends Plugin>
    implements Command, Identifiable<string>
{
    constructor(
        protected plugin: TPlugin,
        private errorNoticer: ErrorNoticer
    ) {}
    abstract id: string;
    abstract name: string;
    async callback(): Promise<void> {
        await this.errorNoticer.wrap(async () => await this.innerCallback());
    }
    protected abstract innerCallback(): Promise<void>;
}
