import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { CommandLoader } from '@obsinflate/core/commandLoader';
import { HelloWorldCommand } from '@obsinflate/hello-world/user-plugins/helloWorldCommand';

export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => {
            return new HelloWorldCommand(plugin, errorNoticer, noticer);
        }
    ]);
}
