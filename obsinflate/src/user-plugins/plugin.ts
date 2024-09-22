import { App } from '@obsidian/app';
import { Command } from '@obsidian/user-plugins/command';

/**
 * v1.3.0
 */
export interface Plugin {
    addCommand: (command: Command) => void;
    app: App;
}