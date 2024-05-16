import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { PluginLoader } from '@obsidian/user-plugins/pluginLoader';
import { Plugin } from '@obsidian/user-plugins/plugin';
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
        class CustomCommand extends AbstractCommand {
            constructor(plugin: Plugin) {
                super(plugin);
            }
            id = chance.string();
            name = chance.string();
            callback = jest.fn();
        }
        const loader = new PluginLoader(CustomCommand);
        // Act
        await loader.onload(mockPlugin);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(CustomCommand));
    });   
});