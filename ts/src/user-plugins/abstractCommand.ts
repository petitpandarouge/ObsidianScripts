import { Plugin } from '@obsidian/user-plugins/plugin';
import { Command } from '@obsidian/user-plugins/command';
import { Identifiable } from "@obsidian/identifiable";

export abstract class AbstractCommand implements Command, Identifiable<string> {
    constructor(protected plugin: Plugin) { }
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}