import { Plugin } from "@obsidian/user-plugins/plugin";
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";

export class CommandLoader {
    constructor(private plugin: Plugin) { }
    async load(builders: CommandBuilder[]): Promise<void> {
        await Promise.all(builders.map(builder => this.plugin.addCommand(builder(this.plugin))));
    }
}
