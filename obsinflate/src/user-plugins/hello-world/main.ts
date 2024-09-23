import { CommandLoader } from "@obsinflate/user-plugins/commandLoader";
import { HelloWorldCommand } from "@obsinflate/user-plugins/hello-world/helloWorldCommand";
import { Plugin } from "@obsinflate/user-plugins/plugin";

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new HelloWorldCommand(plugin)
    ]);
}