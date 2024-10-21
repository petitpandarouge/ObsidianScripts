import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { IUniqueNameGeneratorSeed } from '@obsinflate/core/uniqueNameGeneratorSeed';
import { NO_DATA, UniqueNoteCreator } from '@obsinflate/core/uniqueNoteCreator';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { App } from 'obsidian';

describe('UniqueNoteCreator', () => {
    it('should create "YYYYMMDDHHmm - basename.md" note', async () => {
        // Arrange
        const chance = new Chance();
        const mockNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockSeed = mock<IUniqueNameGeneratorSeed>({
            next: jest.fn().mockReturnValue(mockNowResult)
        });
        const mockNameGenerator = mock<IUniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mockSeed;
            })
        });
        const mockApp = mockDeep<App>();
        const uniqueNoteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockApp
        );
        const mockBasename = chance.sentence();
        // Act
        await uniqueNoteCreator.createUniqueNoteIn('', mockBasename);
        // Assert
        expect(mockApp.vault.create).toHaveBeenCalledWith(
            `${mockNowResult} - ${mockBasename}${MARKDOWN_FILE_EXTENSION}`,
            NO_DATA
        );
    });
});
