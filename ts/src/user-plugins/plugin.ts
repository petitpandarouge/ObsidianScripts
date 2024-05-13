import { Command } from '@obsidian/user-plugins/command';

export interface Plugin {
    addCommand: (command: Command) => void;
}