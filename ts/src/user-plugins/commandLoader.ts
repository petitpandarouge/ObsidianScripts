import { Plugin } from "@obsidian/user-plugins/plugin";
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";

export class CommandLoader {
    constructor(private plugin: Plugin) { }
    async load(builders: CommandBuilder[]): Promise<void> {
        builders[0](this.plugin);
        return Promise.resolve();
        // await Promise.all(builders.map(builder => this.plugin.addCommand(builder(this.plugin))));
        //await Promise.all(builders.map(builder => builder(this.plugin)));
    }
}
