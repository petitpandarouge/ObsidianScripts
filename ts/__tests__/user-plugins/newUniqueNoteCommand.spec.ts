﻿import { loader as newUniqueNote } from '@obsidian/user-plugins/newUniqueNote';
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
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalled();
    });   
});