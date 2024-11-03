import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import Chance from 'chance';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Plugin } from 'obsidian';

const chance = new Chance();

// TODO : not a mock, a stub
export class MockCommand extends AbstractCommand<Plugin> {
    constructor(plugin: Plugin, errorNoticer: ErrorNoticer) {
        super(plugin, errorNoticer);
    }
    id = chance.guid();
    name = chance.string();
    callback = jest.fn();
    innerCallback = jest.fn();
}
