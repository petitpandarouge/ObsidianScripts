import { IIdentifiable } from '@obsinflate/iIdentifiable';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { Command } from 'obsidian';

export abstract class AbstractCommand
    implements Command, IIdentifiable<string>
{
    constructor(protected plugin: UserPlugins) {}
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}
