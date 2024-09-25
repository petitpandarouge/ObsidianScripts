import { AbstractPlugin } from '@obsinflate/abstractPlugin';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { HelloWorldCommand } from '@obsinflate/user-plugins/hello-world/helloWorldCommand';

export async function onload(plugin: AbstractPlugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([(plugin) => new HelloWorldCommand(plugin)]);
}
