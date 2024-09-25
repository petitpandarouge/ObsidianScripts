import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { HelloWorldCommand } from '@obsinflate/user-plugins/hello-world/helloWorldCommand';

export async function onload(plugin: UserPlugins): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([(plugin) => new HelloWorldCommand(plugin)]);
}
