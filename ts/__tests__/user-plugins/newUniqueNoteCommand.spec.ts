import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';
import moment from 'moment';

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
        const chance = new Chance();
        const date = chance.date();
        const uniqueName = moment(date).format('YYYYMMDDHHmm');
        const mockUniqueNameGenerator = {
            generate: jest.fn(() => uniqueName),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, mockUniqueNameGenerator);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(uniqueName, "");
    });
});