import { PluginLoader } from '@obsidian/user-plugins/pluginLoader';
import { mockPlugin } from './mockPlugin';
import Chance from 'chance';

const chance = new Chance();

const command = {
    id: chance.string(),
    name: chance.string(),
    callback: jest.fn(),
};

describe('PluginLoader', () => {
    it('should add a new command in the loaded plugin', async () => {
        const loader = new PluginLoader(command);
        await loader.onload(mockPlugin);
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(command);
    });   
});