import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import Chance from 'chance';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';

const chance = new Chance();

export class MockCommand extends AbstractCommand {
    constructor(plugin: UserPlugins) {
        super(plugin);
    }
    id = chance.guid();
    name = chance.string();
    callback = jest.fn();
}
