jest.mock('@obsinflate/core/user-plugins/commandLoader', () => {
    return {
        CommandLoader: jest.fn()
    };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommandLoader } from '@obsinflate/core/user-plugins/commandLoader';
import { onload } from '@obsinflate/inflates/user-plugins/main';
import { NewProjectCommand } from '@obsinflate/inflates/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsinflate/inflates/user-plugins/newUniqueNoteCommand';
import { mockDeep } from 'jest-mock-extended';
import { UserPlugins } from '@obsinflate/api/user-plugins/userPlugins';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';

describe('main', () => {
    it('should load the commands into the plugin using the CommandLoader', async () => {
        // Arrange
        const mockPlugin = mockDeep<UserPlugins>();
        let loadSpy;
        const mockCommandLoader = jest.fn().mockImplementation(() => {
            const commandLoader = {
                load: jest.fn()
            };
            loadSpy = jest.spyOn(commandLoader, 'load');
            return commandLoader;
        });
        (CommandLoader as jest.Mock) = mockCommandLoader;
        // Act
        await onload(mockPlugin);
        // Assert
        expect(mockCommandLoader).toHaveBeenCalledTimes(1);
        expect(mockCommandLoader).toHaveBeenCalledWith(
            mockPlugin,
            expect.any(ErrorNoticer)
        );
        expect(loadSpy).toHaveBeenCalledTimes(1);
        expect(loadSpy).toHaveBeenCalledWith(expect.any(Array));
        // Call the builders passed to "load" and check if they return the correct types.
        const [newProjectCommandBuilder, newUniqueNoteCommandBuilder] =
            loadSpy!.mock.calls[0][0];
        expect(newProjectCommandBuilder(mockPlugin)).toBeInstanceOf(
            NewProjectCommand
        );
        expect(newUniqueNoteCommandBuilder(mockPlugin)).toBeInstanceOf(
            NewUniqueNoteCommand
        );
    });
});
