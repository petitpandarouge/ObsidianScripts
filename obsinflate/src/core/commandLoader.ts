import { CommandBuilder } from '@obsinflate/core/commandBuilder';
import { IdValidator } from '@obsinflate/core/idValidator';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Plugin } from 'obsidian';

//TODO user plugins
export class CommandLoader<TPlugin extends Plugin> {
    constructor(
        private plugin: TPlugin,
        private errorNoticer: ErrorNoticer
    ) {}
    async load(builders: CommandBuilder<TPlugin>[]): Promise<void> {
        await this.errorNoticer.wrap(
            async () => await this.#innerLoad(builders)
        );
    }
    async #innerLoad(builders: CommandBuilder<TPlugin>[]): Promise<void> {
        const unicityValidator = new IdValidator<string>();
        for (const builder of builders) {
            const command = builder(this.plugin);
            unicityValidator.validate(command);
            this.plugin.addCommand(command);
        }
        await Promise.resolve();
    }
}
