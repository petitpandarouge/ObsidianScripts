import { CommandBuilder } from '@obsinflate/user-plugins/commandBuilder';
import { IdValidator } from '@obsinflate/idValidator';
import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { Noticer } from '@obsinflate/infrastructure/noticer';

export class CommandLoader {
    #errorNoticer: ErrorNoticer;
    constructor(private plugin: UserPlugins) {
        const noticer = new Noticer();
        this.#errorNoticer = new ErrorNoticer(noticer);
    }
    async load(builders: CommandBuilder[]): Promise<void> {
        await this.#errorNoticer.wrap(
            async () => await this.#innerLoad(builders)
        );
    }
    async #innerLoad(builders: CommandBuilder[]): Promise<void> {
        const unicityValidator = new IdValidator<string>();
        for (const builder of builders) {
            const command = builder(this.plugin);
            unicityValidator.validate(
                command,
                (id) => `UserPlugins : Command with id ${id} already exists.`
            );
            this.plugin.addCommand(command);
        }
        await Promise.resolve();
    }
}
