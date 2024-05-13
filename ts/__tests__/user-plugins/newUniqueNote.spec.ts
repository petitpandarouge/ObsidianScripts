import { loader as newUniqueNote } from '@obsidian/user-plugins/newUniqueNote';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';

describe('newUniqueNote', () => {
    it('should add a new command in the loaded plugin', async () => {
        // Arrange
        const mockPlugin = {
            addCommand: jest.fn(),
        };
        // Act        
        await newUniqueNote.onload(mockPlugin);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(NewUniqueNoteCommand));
    });   
});