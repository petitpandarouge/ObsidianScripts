import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/core/commandLoader';
import { NewProjectCommand } from '@obsinflate/inflates/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { AppExtension } from '@obsinflate/api/obsidian/appExtension';

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
