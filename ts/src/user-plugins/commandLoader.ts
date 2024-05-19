import { Plugin } from "@obsidian/user-plugins/plugin";
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";

// TODO - Implement an id verifier
export class CommandLoader {
    constructor(private plugin: Plugin) { }
    load(builders: CommandBuilder[]): Promise<void> {
        const ids = new Set();
        for (const builder of builders) {
            const command = builder(this.plugin);
            if (ids.has(command.id)) {
                throw new Error(`Duplicate command id: ${command.id}`);
            }
            ids.add(command.id);
            this.plugin.addCommand(command);
        }
        return Promise.resolve();
    }
}
