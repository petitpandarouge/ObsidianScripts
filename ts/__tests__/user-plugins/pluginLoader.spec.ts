import { AbstractCommand } from "@obsidian/user-plugins/abstractCommand";
import { AbstractPluginLoader } from '@obsidian/user-plugins/abstractPluginLoader';
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
        class CustomPluginLoader extends AbstractPluginLoader {
            buildCommand(plugin: Plugin): AbstractCommand {
                return new CustomCommand(plugin);
            }
        }
        const loader = new CustomPluginLoader();
        // Act
        await loader.onload(mockPlugin);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(CustomCommand));
    });   
});