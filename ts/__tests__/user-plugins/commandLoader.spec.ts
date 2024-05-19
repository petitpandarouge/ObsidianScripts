import Chance from 'chance';
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { CommandLoader } from '@obsidian/user-plugins/commandLoader';
import { MockPlugin } from '@obsidian/tests/user-plugins/mocks/mockPlugin';

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
    // it('should add commands in the UserPlugins plugin', async () => {
    //     // Arrange
    //     const mockPlugin = new MockPlugin();
    //     const chance = new Chance();
    //     const buildersCount = chance.integer({ min: 0, max: 10 });
    //     const mockCommandBuilder: CommandBuilder = jest.fn();
    //     const builders = Array.from({ length: buildersCount }, () => mockCommandBuilder);
    //     const loader = new CommandLoader(mockPlugin);
    //     // Act
    //     await loader.load(builders);
    //     // Assert
    //     expect(mockCommandBuilder).toHaveBeenCalledTimes(buildersCount);
    //     expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
    // });   
});