import { CommandLoader } from "@obsidian/user-plugins/commandLoader";
import { HelloWorldCommand } from "@obsidian/user-plugins/hello-world/helloWorldCommand";
import { Plugin } from "@obsidian/user-plugins/plugin";

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new HelloWorldCommand(plugin)
    ]);
}