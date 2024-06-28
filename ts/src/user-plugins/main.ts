import { DateService } from "@obsidian/infrastructure/dateService";
import { CommandLoader } from "@obsidian/user-plugins/commandLoader";
import { NewProjectCommand } from "@obsidian/user-plugins/newProjectCommand";
import { NewUniqueNoteCommand } from "@obsidian/user-plugins/newUniqueNoteCommand";
import { Plugin } from "@obsidian/user-plugins/plugin";

export async function onload(plugin: Plugin): Promise<void> {
    const commandLoader = new CommandLoader(plugin);
    await commandLoader.load([
        (plugin) => new NewProjectCommand(plugin),
        (plugin) => {
            const dateService = new DateService();
            return new NewUniqueNoteCommand(plugin, dateService);
        }
    ]);
}
