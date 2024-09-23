import { Plugin } from '@obsinflate/user-plugins/plugin';
import { Command } from '@obsinflate/user-plugins/command';
import { Identifiable } from "@obsinflate/identifiable";

export abstract class AbstractCommand implements Command, Identifiable<string> {
    constructor(protected plugin: Plugin) { }
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}