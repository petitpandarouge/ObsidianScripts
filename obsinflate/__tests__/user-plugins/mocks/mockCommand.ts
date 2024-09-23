import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import { Plugin } from '@obsinflate/user-plugins/plugin';
import Chance from 'chance';

const chance = new Chance();

export class MockCommand extends AbstractCommand {
    constructor(plugin: Plugin) {
        super(plugin);
    }
    id = chance.guid();
    name = chance.string();
    callback = jest.fn();
}
