import { IIdentifiable } from '@obsinflate/iIdentifiable';
import { Command, Plugin } from 'obsidian';

export abstract class AbstractCommand<TPlugin extends Plugin>
    implements Command, IIdentifiable<string>
{
    constructor(protected plugin: TPlugin) {}
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}
