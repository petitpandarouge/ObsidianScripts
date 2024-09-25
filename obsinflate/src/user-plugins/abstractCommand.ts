import { IIdentifiable } from '@obsinflate/iIdentifiable';
import { AbstractPlugin } from '@obsinflate/abstractPlugin';
import { Command } from 'obsidian';

export abstract class AbstractCommand
    implements Command, IIdentifiable<string>
{
    constructor(protected plugin: AbstractPlugin) {}
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}
