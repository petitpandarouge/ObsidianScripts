jest.mock('@obsidian/user-plugins/commandLoader', () => {
    return {
        CommandLoader: jest.fn(),
    };
  });

import { MockPlugin } from '@obsidian/tests/user-plugins/mocks/mockPlugin';
import { CommandLoader } from '@obsidian/user-plugins/commandLoader';
import { onload } from '@obsidian/user-plugins/main';
import { NewProjectCommand } from '@obsidian/user-plugins/newProjectCommand';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';

describe('main', () => {
    it('should load the commands into the plugin using the CommandLoader', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        let loadSpy;
        const mockCommandLoader = jest.fn().mockImplementation(() => {
            let commandLoader = {
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
        expect(mockCommandLoader).toHaveBeenCalledWith(mockPlugin);
        expect(loadSpy).toHaveBeenCalledTimes(1);
        expect(loadSpy).toHaveBeenCalledWith(expect.any(Array));
        // Call the builders passed to load and check if they return the correct types.
        const [
            newProjectCommandBuilder, 
            newUniqueNoteCommandBuilder
        ] = loadSpy!.mock.calls[0][0];
        expect(newProjectCommandBuilder(mockPlugin)).toBeInstanceOf(NewProjectCommand);
        expect(newUniqueNoteCommandBuilder(mockPlugin)).toBeInstanceOf(NewUniqueNoteCommand);
    });   
});