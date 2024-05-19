import { CommandLoader } from "@obsidian/user-plugins/commandLoader";
import { Plugin } from "@obsidian/user-plugins/plugin";

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([]);
}
