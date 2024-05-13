import { Command } from "@obsidian/user-plugins/command";

export class NewProjectCommand implements Command {
    id: string = "new-project-from-empty-note";
    name: string = "Create new project structure from empty note";
    callback(): Promise<void> {
        return Promise.resolve();
    }
}