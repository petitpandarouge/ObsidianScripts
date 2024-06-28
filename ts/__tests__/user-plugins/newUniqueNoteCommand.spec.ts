import { MockPlugin } from '@obsidian/tests/user-plugins/mocks/mockPlugin';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const mockDateService = {
            now: jest.fn().mockImplementation(() => {
                return {
                    format: jest.fn()
                };
            }),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, mockDateService);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalled();
    });
    it('should create a "YYYYMMDDHHmm" file', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const chance = new Chance();
        const mockedNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockDateService = {
            now: jest.fn().mockImplementation(() => {
                return {
                    format: jest.fn().mockReturnValue(mockedNowResult)
                };
            }),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, mockDateService);
        // Act        
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(mockedNowResult, "");
    });
});