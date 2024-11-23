import { MARKDOWN_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { FileNameSanitizer } from '@obsinflate/core/fileNameSanitizer';
import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { UniqueNameGeneratorSeed } from '@obsinflate/core/uniqueNameGeneratorSeed';
import {
    NO_BASENAME,
    NO_CONTENT,
    ROOT_PATH,
    NOTE_NAME_SEPARATOR,
    UniqueNoteCreator
} from '@obsinflate/core/uniqueNoteCreator';
import Chance from 'chance';
import { mock, mockDeep } from 'jest-mock-extended';
import { App } from 'obsidian';

const NO_SEED = '';

describe('UniqueNoteCreator', () => {
    it('should create "YYYYMMDDHHmm - basename.md" note with the given content', async () => {
        // Arrange
        const chance = new Chance();
        const mockNowResult = chance
            .integer({ min: 100000000000, max: 900000000000 })
            .toString();
        const mockSeed = mock<UniqueNameGeneratorSeed>({
            next: jest.fn().mockReturnValue(mockNowResult)
        });
        const mockNameGenerator = mock<UniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mockSeed;
            })
        });
        const mockFileNameSanitizer = mock<FileNameSanitizer>({
            sanitize: jest.fn().mockImplementation((name: string) => {
                return name;
            })
        });
        const mockApp = mockDeep<App>();
        const uniqueNoteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockFileNameSanitizer,
            mockApp
        );
        const mockBasename = chance.sentence();
        const mockContent = chance.paragraph();
        // Act
        await uniqueNoteCreator.create(ROOT_PATH, mockBasename, mockContent);
        // Assert
        expect(mockApp.vault.create).toHaveBeenCalledWith(
            `${mockNowResult}${NOTE_NAME_SEPARATOR}${mockBasename}${MARKDOWN_FILE_EXTENSION}`,
            mockContent
        );
    });
    it('should throw if any other error than "file already exists" occurs', async () => {
        // Arrange
        const chance = new Chance();
        const mockSeed = mock<UniqueNameGeneratorSeed>({
            next: jest.fn().mockReturnValue(NO_SEED)
        });
        const mockNameGenerator = mock<UniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mockSeed;
            })
        });
        const mockErrorMessage = chance.sentence();
        const mockFileNameSanitizer = mock<FileNameSanitizer>({
            sanitize: jest.fn().mockImplementation((name: string) => {
                return name;
            })
        });
        const mockApp = mockDeep<App>({
            vault: {
                create: jest.fn().mockImplementation(() => {
                    throw new Error(mockErrorMessage);
                })
            }
        });
        const uniqueNoteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockFileNameSanitizer,
            mockApp
        );
        // Act
        const action = async () =>
            await uniqueNoteCreator.create(ROOT_PATH, NO_BASENAME, NO_CONTENT);
        // Assert
        await expect(action).rejects.toThrow(mockErrorMessage);
    });
    it('should sanitizes the basename for it to be a valid note title', async () => {
        // Arrange
        const chance = new Chance();
        const mockSeed = mock<UniqueNameGeneratorSeed>({
            next: jest.fn().mockReturnValue(NO_SEED)
        });
        const mockNameGenerator = mock<UniqueNameGenerator>({
            generateNewSeed: jest.fn().mockImplementation(() => {
                return mockSeed;
            })
        });
        const mockFileNameSanitizer = mock<FileNameSanitizer>({
            sanitize: jest.fn().mockImplementation((name: string) => {
                return name;
            })
        });
        const mockApp = mockDeep<App>();
        const uniqueNoteCreator = new UniqueNoteCreator(
            mockNameGenerator,
            mockFileNameSanitizer,
            mockApp
        );
        const baseName = chance.sentence();
        // Act
        await uniqueNoteCreator.create(ROOT_PATH, baseName, NO_CONTENT);
        // Assert
        expect(mockFileNameSanitizer.sanitize).toHaveBeenCalledTimes(1);
        expect(mockFileNameSanitizer.sanitize).toHaveBeenCalledWith(baseName);
    });
});
