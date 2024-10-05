import { MockCommand } from '@obsinflate/tests/doubles/mockCommand';
import { AbstractCommand } from '@obsinflate/core/abstractCommand';
import { CommandBuilder } from '@obsinflate/core/commandBuilder';
import { CommandLoader } from '@obsinflate/core/commandLoader';
import Chance from 'chance';
import { mock } from 'jest-mock-extended';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Plugin } from 'obsidian';

describe('CommandLoader', () => {
    it('should build command', async () => {
        // Arrange
        const mockPlugin = mock<Plugin>();
        const mockErrorNoticer = mock<ErrorNoticer>();
        const mockCommandBuilder: CommandBuilder<Plugin> = jest
            .fn()
            .mockImplementation(
                () => new MockCommand(mockPlugin, mockErrorNoticer)
            );
        const builders = [mockCommandBuilder];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader<Plugin>(mockPlugin, errorNoticer);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockCommandBuilder).toHaveBeenCalledTimes(1);
        expect(mockCommandBuilder).toHaveBeenCalledWith(mockPlugin);
    });
    it('should build as many commands as provided builders', async () => {
        // Arrange
        const mockPlugin = mock<Plugin>();
        const mockErrorNoticer = mock<ErrorNoticer>();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 0, max: 0 });
        const mockCommandBuilder: CommandBuilder<Plugin> = jest
            .fn()
            .mockImplementation(
                () => new MockCommand(mockPlugin, mockErrorNoticer)
            );
        const builders = Array.from(
            { length: buildersCount },
            () => mockCommandBuilder
        );
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader<Plugin>(mockPlugin, errorNoticer);
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
        const mockPlugin = mock<Plugin>();
        const builders: CommandBuilder<Plugin>[] = [];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader<Plugin>(mockPlugin, errorNoticer);
        // Act
        await loader.load(builders);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledTimes(0);
    });
    it('should add as many commands in the UserPlugins plugin as provided builders', async () => {
        // Arrange
        const mockPlugin = mock<Plugin>();
        const mockErrorNoticer = mock<ErrorNoticer>();
        const chance = new Chance();
        const buildersCount = chance.integer({ min: 1, max: 10 });
        const mockCommandBuilder: CommandBuilder<Plugin> = jest
            .fn()
            .mockImplementation(
                () => new MockCommand(mockPlugin, mockErrorNoticer)
            );
        const builders = Array.from(
            { length: buildersCount },
            () => mockCommandBuilder
        );
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader<Plugin>(mockPlugin, errorNoticer);
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
        const mockPlugin = mock<Plugin>();
        const mockErrorNoticer = mock<ErrorNoticer>();
        const chance = new Chance();
        const commandId = chance.string();
        const mockCommandBuilder: CommandBuilder<Plugin> = jest
            .fn()
            .mockImplementation(() => {
                const command = new MockCommand(mockPlugin, mockErrorNoticer);
                command.id = commandId;
                return command;
            });
        const builders = [mockCommandBuilder, mockCommandBuilder];
        const mockedNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockedNoticer);
        const loader = new CommandLoader<Plugin>(mockPlugin, errorNoticer);
        const errorMessage = `UserPlugins : Command with id ${commandId} already exists.`;
        // Act
        const action = async () => await loader.load(builders);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockedNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockedNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            expect.any(Number),
            expect.any(String)
        );
    });
});
