import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';

describe('newUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = {
            addCommand: jest.fn(),
            app: {
                vault: {
                    create: jest.fn(),
                },
            },
        };
        const uniqueNameGenerator = {
            generate: jest.fn(),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, uniqueNameGenerator);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalled();
    });
    it('should create a "YYYYMMDDHHmm" file', async () => {
        // Arrange
        const mockPlugin = {
            addCommand: jest.fn(),
            app: {
                vault: {
                    create: jest.fn(),
                },
            },
        };
        const uniqueName = '202101011200';
        const uniqueNameGenerator = {
            generate: jest.fn(() => uniqueName),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, uniqueNameGenerator);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(uniqueName, "");
    });
});