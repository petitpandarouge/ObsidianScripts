import { IIdentifiable } from '@obsinflate/iIdentifiable';
import { Command } from 'obsidian';
import { Plugin } from 'obsidian';

export abstract class AbstractCommand
    implements Command, IIdentifiable<string>
{
    constructor(protected plugin: Plugin) {}
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}
