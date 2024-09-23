import { App } from 'obsidian';
import { Command } from '@obsinflate/user-plugins/command';

/**
 * v1.3.0
 */
export interface Plugin {
    addCommand: (command: Command) => void;
    app: App;
}