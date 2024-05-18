import { AbstractPluginLoader } from '@obsidian/user-plugins/abstractPluginLoader';
import { NewProjectCommand } from '@obsidian/user-plugins/newProjectCommand';
import { AbstractCommand } from '@obsidian/user-plugins//abstractCommand';
import { Plugin } from '@obsidian/user-plugins/plugin';

class PluginLoader extends AbstractPluginLoader {
    buildCommand(plugin: Plugin): AbstractCommand {
        return new NewProjectCommand(plugin);
    }
}

const onload = (plugin: Plugin): Promise<void> => {
    const loader = new PluginLoader();
    return loader.load(plugin);
}

export { onload };