import { AbstractPluginLoader } from '@obsidian/user-plugins/abstractPluginLoader';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';
import { AbstractCommand } from '@obsidian/user-plugins//abstractCommand';
import { Plugin } from '@obsidian/user-plugins/plugin';
import { UniqueNameGenerator } from '@obsidian/uniqueNameGenerator';

class PluginLoader extends AbstractPluginLoader {
    buildCommand(plugin: Plugin): AbstractCommand {
        const uniqueNameGenerator = new UniqueNameGenerator();
        return new NewUniqueNoteCommand(plugin, uniqueNameGenerator);
    }
}

export const loader = new PluginLoader();