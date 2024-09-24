import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { HelloWorldCommand } from '@obsinflate/user-plugins/hello-world/helloWorldCommand';
import { Plugin } from 'obsidian';

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([(plugin) => new HelloWorldCommand(plugin)]);
}
