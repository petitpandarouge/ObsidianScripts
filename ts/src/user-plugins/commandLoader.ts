import { Plugin } from "@obsidian/user-plugins/plugin";
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { IdValidator } from "@obsidian/idValidator";
import { ErrorNoticer } from "@obsidian/errorNoticer";

export class CommandLoader {
    #errorNoticer: ErrorNoticer;
    constructor(private plugin: Plugin) { 
        this.#errorNoticer = new ErrorNoticer();
    }
    async load(builders: CommandBuilder[]): Promise<void> {
        await this.#errorNoticer.wrap(async () => await this.#innerLoad(builders));
    } 
    async #innerLoad(builders: CommandBuilder[]): Promise<void> {
        const unicityValidator = new IdValidator<string>();
        for (const builder of builders) {
            const command = builder(this.plugin);
            unicityValidator.validate(command, (id) => `UserPlugins : Command with id ${id} already exists.`);
            this.plugin.addCommand(command);
        }
        await Promise.resolve();
    }
}
