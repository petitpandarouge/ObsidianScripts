import { Scripts } from "@obsidian/quick-add/scripts";

export interface ScriptsBuilder {
    build: () => Scripts;
}