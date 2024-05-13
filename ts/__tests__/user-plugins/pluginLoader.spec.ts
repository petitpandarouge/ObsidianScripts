import { PluginLoader } from '@obsidian/user-plugins/pluginLoader';

const mockPlugin = {
    addCommand: jest.fn(),
};

describe('PluginLoader', () => {
    it('should add a new command in the loaded plugin', async () => {
        const loader = new PluginLoader({});
        await loader.onload(mockPlugin);
        expect(mockPlugin.addCommand).toHaveBeenCalled();
    });   
});