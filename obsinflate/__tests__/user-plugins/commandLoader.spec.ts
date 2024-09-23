jest.mock('@obsidian/noticeWrapper', () => {
    return {
      NoticeWrapper: jest.fn(),
    };
  });
  
import { MockCommand } from '@obsidian/tests/user-plugins/mocks/mockCommand';
import { AbstractCommand } from '@obsidian/user-plugins/abstractCommand';
import { CommandBuilder } from "@obsidian/user-plugins/commandBuilder";
import { CommandLoader } from '@obsidian/user-plugins/commandLoader';
import { NoticeWrapper } from '@obsidian/noticeWrapper';
import { Plugin} from '@obsinflate/user-plugins/plugin';
import Chance from 'chance';
import { mockDeep } from 'jest-mock-extended';

describe('CommandLoader', () => {
    it('should build command', async () => {
        // Arrange
        const mockPlugin = mockDeep<Plugin>();
        const mockCommandBuilder: CommandBuilder = jest.fn().mockImplementation(() => new MockCommand(mockPlugin));
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
        const mockPlugin = mockDeep<Plugin>();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 0, max: 0 });
        const mockCommandBuilder: CommandBuilder = jest.fn().mockImplementation(() => new MockCommand(mockPlugin));
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
        const mockPlugin = mockDeep<Plugin>();
        const builders: CommandBuilder[] = [ ];
        const loader = new CommandLoader(mockPlugin);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(0);
    }); 
    it('should add as many commands in the UserPlugins plugin as provided builders', async () => {
        // Arrange
        const mockPlugin = mockDeep<Plugin>();
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
    it('should throw and notice if at least two commands have the same id', async () => {
        // Arrange
        const mockPlugin = mockDeep<Plugin>();
        const chance = new Chance();
        const commandId = chance.string();
        const mockCommandBuilder: CommandBuilder = jest.fn().mockImplementation(() => {
            const command = new MockCommand(mockPlugin);
            command.id = commandId;
            return command;
        });
        const builders = [ mockCommandBuilder, mockCommandBuilder ];
        const mockNotice = jest.fn();
        (NoticeWrapper as jest.Mock) = mockNotice;
        const loader = new CommandLoader(mockPlugin);
        const errorMessage = `UserPlugins : Command with id ${commandId} already exists.`;
        // Act
        const action = async () => await loader.load(builders);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockNotice).toHaveBeenCalledTimes(1);
        expect(mockNotice).toHaveBeenCalledWith(errorMessage, expect.any(Number));
    });
});