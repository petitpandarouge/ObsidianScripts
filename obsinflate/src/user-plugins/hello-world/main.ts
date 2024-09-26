import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { Noticer } from '@obsinflate/infrastructure/noticer';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { HelloWorldCommand } from '@obsinflate/user-plugins/hello-world/helloWorldCommand';

export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => {
            const noticer = new Noticer();
            return new HelloWorldCommand(plugin, errorNoticer, noticer);
        }
    ]);
}
