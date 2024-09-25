import { AbstractCommand } from '@obsinflate/user-plugins/abstractCommand';
import Chance from 'chance';
import { AbstractPlugin } from '@obsinflate/abstractPlugin';

const chance = new Chance();

export class MockCommand extends AbstractCommand {
    constructor(plugin: AbstractPlugin) {
        super(plugin);
    }
    id = chance.guid();
    name = chance.string();
    callback = jest.fn();
}
