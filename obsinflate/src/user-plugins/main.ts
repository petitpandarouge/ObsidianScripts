import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/user-plugins/newUniqueNoteCommand';

export async function onload(plugin: UserPlugins): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin),
        (plugin) => {
            const dateTimeProvider = new DateTimeProvider();
            const generator = new UniqueNameGenerator(dateTimeProvider);
            return new NewUniqueNoteCommand(plugin, generator);
        }
    ]);
}
