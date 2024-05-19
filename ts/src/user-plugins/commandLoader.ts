import { Plugin } from "@obsidian/user-plugins/plugin";
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { IdValidator } from "@obsidian/idValidator";

export class CommandLoader {
    constructor(private plugin: Plugin) { }
    load(builders: CommandBuilder[]): Promise<void> {
        const unicityValidator = new IdValidator<string>();
        for (const builder of builders) {
            const command = builder(this.plugin);
            unicityValidator.validate(command);
            this.plugin.addCommand(command);
        }
        return Promise.resolve();
    }
}
