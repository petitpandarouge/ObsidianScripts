import { AbstractCommand } from '@obsinflate/abstractCommand';
import Chance from 'chance';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { ErrorNoticer } from '@obsinflate/errorNoticer';

const chance = new Chance();

export class MockCommand extends AbstractCommand<UserPlugins> {
    constructor(plugin: UserPlugins, errorNoticer: ErrorNoticer) {
        super(plugin, errorNoticer);
    }
    id = chance.guid();
    name = chance.string();
    callback = jest.fn();
    innerCallback = jest.fn();
}
