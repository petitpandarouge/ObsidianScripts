import { DateTimeService } from '@obsinflate/infrastructure/dateTimeService';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import { NewProjectCommand } from '@obsinflate/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/user-plugins/newUniqueNoteCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin),
        (plugin) => {
            const dateService = new DateTimeService();
            return new NewUniqueNoteCommand(plugin, dateService);
        }
    ]);
}
