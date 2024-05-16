import { PluginLoader } from '@obsidian/user-plugins/pluginLoader';
import Chance from 'chance';

const chance = new Chance();

describe('PluginLoader', () => {
    it('should add a new command in the loaded plugin', async () => {
        // Arrange
        const mockPlugin = {
            addCommand: jest.fn(),
            app: {
                vault: {
                    create: jest.fn(),
                },
            },
        };
        const command = {
            id: chance.string(),
            name: chance.string(),
            callback: jest.fn(),
        };
        const loader = new PluginLoader(command);
        // Act
        await loader.onload(mockPlugin);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(command);
    });   
});