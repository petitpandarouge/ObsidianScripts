import { MockPlugin } from '@obsidian/tests/user-plugins/mocks/mockPlugin';
import { MockDateService } from '@obsidian/tests/user-plugins/mocks/mockDateService';
import { NewUniqueNoteCommand } from '@obsidian/user-plugins/newUniqueNoteCommand';
import Chance from 'chance';
import { MockDate } from './mocks/mockDate';

describe('NewUniqueNoteCommand', () => {
    it('should call at least once plugin.app.vault.create', async () => {
        // Arrange
        const mockPlugin = new MockPlugin();
        const mockDateService = new MockDateService();
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
                let mockDate = new MockDate();
                mockDate.format = jest.fn().mockReturnValue(mockedNowResult);
                return mockDate;
            }),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, mockDateService);
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        expect(mockPlugin.app.vault.create).toHaveBeenCalledWith(mockedNowResult, "");
    });
    it('should create a "YYYYMMDDHHm(m+1)" file if the "YYYYMMDDHHmm" file already exists', async () => {
        // Arrange
        const chance = new Chance();
        let mockedNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 });
        let mockedDateResult = mockedNowResult;
        const existingFilesCount = chance
            .integer({ min: 1, max: 30 });
        const createdFileName = (mockedNowResult + existingFilesCount).toString();
        const mockPlugin = new MockPlugin();
        mockPlugin.app.vault.create = jest.fn().mockImplementation((fileName: string) => {
            if (fileName !== createdFileName) {
                throw new Error('File already exists');
            }
        });
        const mockDateService = {
            now: jest.fn().mockImplementation(() => {
                return {
                    format: jest.fn().mockImplementation(() => {
                        return mockedDateResult.toString();
                    }),
                    add: jest.fn().mockImplementation((amount: number, unit: string) => {
                        if (unit === "minutes") {
                            mockedDateResult++;
                        }
                    })
                };
            }),
        };
        const newUniqueNoteCommand = new NewUniqueNoteCommand(mockPlugin, mockDateService);
        // Act
        await newUniqueNoteCommand.callback();
        // Assert
        for (let i = 0; i < existingFilesCount; i++) {
            expect(mockPlugin.app.vault.create).toHaveBeenCalledWith((mockedNowResult + i).toString(), "");
        }
    });
});