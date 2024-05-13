import { PluginLoader } from '@obsidian/user-plugins/pluginLoader';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';

export const loader = new PluginLoader(new NewUniqueNoteCommand());