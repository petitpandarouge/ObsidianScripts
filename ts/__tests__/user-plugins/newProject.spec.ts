import { onload } from '@obsidian/user-plugins/newProject';
import { NewProjectCommand } from '@obsidian/user-plugins/newProjectCommand';

describe('newProject', () => {
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
        // Act
        await onload(mockPlugin);
        // Assert
        expect(mockPlugin.addCommand).toHaveBeenCalledWith(expect.any(NewProjectCommand));
    });   
});