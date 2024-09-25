import { AbstractPlugin } from '@obsinflate/abstractPlugin';
import { DateTimeService } from '@obsinflate/infrastructure/dateTimeService';
import { UniqueNameGenerator } from '@obsinflate/uniqueNameGenerator';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/user-plugins/newUniqueNoteCommand';

export async function onload(plugin: AbstractPlugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin),
        (plugin) => {
            const dateTimeService = new DateTimeService();
            const generator = new UniqueNameGenerator(dateTimeService);
            return new NewUniqueNoteCommand(plugin, generator);
        }
    ]);
}
