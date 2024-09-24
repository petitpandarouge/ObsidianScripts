import { App } from 'obsidian';
import { ICommand } from '@obsinflate/user-plugins/iCommand';

/**
 * v1.3.0
 */
export interface Plugin {
    addCommand: (command: ICommand) => void;
    app: App;
}
