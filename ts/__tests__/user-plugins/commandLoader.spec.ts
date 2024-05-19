import { MockCommand } from '@obsidian/tests/user-plugins/mocks/mockCommand';
import { MockPlugin } from '@obsidian/tests/user-plugins/mocks/mockPlugin';
import { AbstractCommand } from '@obsidian/user-plugins/abstractCommand';
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { CommandLoader } from '@obsidian/user-plugins/commandLoader';
import Chance from 'chance';

describe('CommandLoader', () => {
    it('should build command', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const mockCommandBuilder: CommandBuilder = jest.fn();
        const builders = [ mockCommandBuilder ];
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockCommandBuilder).toHaveBeenCalledTimes(1);
        expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
    });  
    it('should build as many commands as provided builders', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 0, max: 0 });
        const mockCommandBuilder: CommandBuilder = jest.fn();
        const builders = Array.from({ length: buildersCount }, () => mockCommandBuilder);
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockCommandBuilder).toHaveBeenCalledTimes(buildersCount);
        if (buildersCount > 0) {
            expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
        }
    });
    it('should not add command in the plugin if empty builders array is provided', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const builders: CommandBuilder[] = [ ];
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(0);
    }); 
    it('should add as many commands in the UserPlugins plugin as provided builders', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 1, max: 10 });
        const mockCommandBuilder: CommandBuilder = jest.fn().mockImplementation(() => new MockCommand(mockPlugin));
        const builders = Array.from({ length: buildersCount }, () => mockCommandBuilder);
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(buildersCount);
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(AbstractCommand));
    });   
});