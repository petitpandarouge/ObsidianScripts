import { Command } from "@obsidian/user-plugins/command";

export class NewUniqueNoteCommand implements Command {
    id: string = 'new-unique-note-in-current-folder';
    name: string = 'Create new unique note in folder of the center panel active note';
    callback(): Promise<void> {
        return Promise.resolve();
    }
}