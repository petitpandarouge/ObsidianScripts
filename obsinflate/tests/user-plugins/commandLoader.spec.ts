import { MockCommand } from '@obsinflate/tests/user-plugins/mocks/mockCommand';
import { AbstractCommand } from '@obsinflate/abstractCommand';
import { CommandBuilder } from '@obsinflate/user-plugins/commandBuilder';
import { CommandLoader } from '@obsinflate/user-plugins/commandLoader';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { UserPlugins } from '@obsinflate/user-plugins/UserPlugins';
import { ErrorNoticer } from '@obsinflate/errorNoticer';
import { Noticer } from '@obsinflate/infrastructure/noticer';

describe('CommandLoader', () => {
    it('should build command', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const mockCommandBuilder: CommandBuilder = jest
            .fn()
            .mockImplementation(() => new MockCommand(mockPlugin));
        const builders = [mockCommandBuilder];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader(mockPlugin, errorNoticer);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockCommandBuilder).toHaveBeenCalledTimes(1);
        expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
    });
    it('should build as many commands as provided builders', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 0, max: 0 });
        const mockCommandBuilder: CommandBuilder = jest
            .fn()
            .mockImplementation(() => new MockCommand(mockPlugin));
        const builders = Array.from(
            { length: buildersCount },
            () => mockCommandBuilder
        );
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader(mockPlugin, errorNoticer);
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
        const mockPlugin = mockDeep<UserPlugins>();
        const builders: CommandBuilder[] = [];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader(mockPlugin, errorNoticer);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(0);
    });
    it('should add as many commands in the UserPlugins plugin as provided builders', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 1, max: 10 });
        const mockCommandBuilder: CommandBuilder = jest
            .fn()
            .mockImplementation(() => new MockCommand(mockPlugin));
        const builders = Array.from(
            { length: buildersCount },
            () => mockCommandBuilder
        );
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader(mockPlugin, errorNoticer);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(buildersCount);
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(
            expect.any(AbstractCommand)
        );
    });
    it('should throw and notice if at least two commands have the same id', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        const chance = new Chance();
        const commandId = chance.string();
        const mockCommandBuilder: CommandBuilder = jest
            .fn()
            .mockImplementation(() => {
                const command = new MockCommand(mockPlugin);
                command.id = commandId;
                return command;
            });
        const builders = [mockCommandBuilder, mockCommandBuilder];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader(mockPlugin, errorNoticer);
        const errorMessage = `UserPlugins : Command with id ${commandId} already exists.`;
        // Act
        const action = async () => await loader.load(builders);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockedNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockedNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            expect.any(Number)
        );
    });
});
