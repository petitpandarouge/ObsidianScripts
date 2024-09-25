import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/user-plugins/newUniqueNoteCommand';
import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { Noticer } from '@obsinflate/infrastructure/noticer';

export async function onload(plugin: UserPlugins): Promise<void> {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const commandLoader = new CommandLoader(plugin, errorNoticer);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin),
        (plugin) => {
            const dateTimeProvider = new DateTimeProvider();
            const generator = new UniqueNameGenerator(dateTimeProvider);
            return new NewUniqueNoteCommand(plugin, generator);
        }
    ]);
}
