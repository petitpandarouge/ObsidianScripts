import { Plugin } from '@obsinflate/user-plugins/plugin';
import { ICommand } from '@obsinflate/user-plugins/iCommand';
import { IIdentifiable } from '@obsinflate/iIdentifiable';

export abstract class AbstractCommand
    implements ICommand, IIdentifiable<string>
{
    constructor(protected plugin: Plugin) {}
    abstract id: string;
    abstract name: string;
    abstract callback(): Promise<void>;
}
