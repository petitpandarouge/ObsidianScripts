import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { Identifiable } from '@obsinflate/identifiable';
import { Command, Plugin } from 'obsidian';

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
