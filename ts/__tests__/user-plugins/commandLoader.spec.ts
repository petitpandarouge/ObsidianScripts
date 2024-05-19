// jest.mock('./mocks/mockPlugin', () => {
//     return jest.fn().mockImplementation(() => {
//         return new class extends MockPlugin{
//             // Mock methods and properties here
//             addCommand = jest.fn((command) => command.id = 'mocked');
//           };
//     });
//   });

import Chance from 'chance';
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { CommandLoader } from '@obsidian/user-plugins/commandLoader';
import { MockPlugin } from './mocks/mockPlugin';

describe('CommandLoader', () => {
    it('should add commands in the UserPlugins plugin', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 0, max: 10 });
        const mockCommandBuilder: CommandBuilder = jest.fn();
        const builders = Array.from({ length: buildersCount }, () => mockCommandBuilder);
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockCommandBuilder).toHaveBeenCalledTimes(buildersCount);
        expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
    });   
});