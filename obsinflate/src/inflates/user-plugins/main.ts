import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/inflates/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { Noticer } from '@obsinflate/infrastructure/noticer';
import { AppExtension } from '@obsinflate/infrastructure/appExtension';

export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin, errorNoticer),
        (plugin) => {
            const dateTimeProvider = new DateTimeProvider();
            // TODO : The generator does not regenerate the seed at each call because it is created once at the obsidian launch.
            const generator = new UniqueNameGenerator(dateTimeProvider);
            const appExtension = AppExtension.extends(plugin.app);
            return new NewUniqueNoteCommand(
                plugin,
                errorNoticer,
                generator,
                appExtension
            );
        }
    ]);
}
