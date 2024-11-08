import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/core/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/inflates/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { AppExtension } from '@obsinflate/api/obsidian/appExtension';
import { UniqueNoteCreator } from '@obsinflate/core/uniqueNoteCreator';

export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin, errorNoticer),
        (plugin) => {
            const appExtension = AppExtension.extends(plugin.app);
            const dateTimeProvider = new DateTimeProvider();
            const nameGenerator = new UniqueNameGenerator(dateTimeProvider);
            const noteCreator = new UniqueNoteCreator(
                nameGenerator,
                appExtension.native
            );
            return new NewUniqueNoteCommand(
                plugin,
                errorNoticer,
                noteCreator,
                appExtension
            );
        }
    ]);
}
