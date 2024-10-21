import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { IUniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { IUniqueNameGeneratorSeed } from '@obsinflate/core/uniqueNameGeneratorSeed';
import {
    NOTE_NAME_SEPARATOR,
    UniqueNoteCreator
} from '@obsinflate/core/uniqueNoteCreator';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { App } from 'obsidian';

const NO_PATH = '';

describe('UniqueNoteCreator', () => {
    it('should create "YYYYMMDDHHmm - basename.md" note with the given content', async () => {
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
        const mockContent = chance.paragraph();
        // Act
        await uniqueNoteCreator.create(NO_PATH, mockBasename, mockContent);
        // Assert
        expect(mockApp.vault.create).toHaveBeenCalledWith(
            `${mockNowResult}${NOTE_NAME_SEPARATOR}${mockBasename}${MARKDOWN_FILE_EXTENSION}`,
            mockContent
        );
    });
});
