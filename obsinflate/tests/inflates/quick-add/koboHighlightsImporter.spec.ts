import { mock, mockDeep } from 'jest-mock-extended';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import {
    ANNOTATIONS_FILE_EXTENSION,
    ANNOTATIONS_FILES_DIR_PATH,
    KoboHighlightsImporter
} from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import Chance from 'chance';
import { File, IFileSystem } from '@obsinflate/infrastructure/fileSystem';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { BUSINESS_ERROR_COLOR } from '@obsinflate/api/obsidian/color';

describe('KoboHighlightsImporter', () => {
    it('should suggest the book highlights to import from the "Digital Editions/Annotations" directory ".annot" files', async () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: File[] = [];
        for (let i = 0; i < filesCount; i++) {
            files.push({
                name: `${chance.sentence()}${ANNOTATIONS_FILE_EXTENSION}`,
                path: `${chance.sentence()}${ANNOTATIONS_FILE_EXTENSION}`
            });
        }
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue(files)
        });
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer
        );
        const mockParams = mockDeep<Parameters>({
            // Empty string is returned to prevent the NoAnnotationsFileSelectedError error to be raised.
            quickAddApi: { suggester: jest.fn().mockResolvedValue('') }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockFileSystem.getFiles).toHaveBeenCalledWith(
            ANNOTATIONS_FILES_DIR_PATH
        );
        expect(mockParams.quickAddApi.suggester).toHaveBeenCalledWith(
            files.map((f) => f.name),
            files.map((f) => f.path)
        );
    });
    it('should notice a NoAnnotationsFileSelectedError error if no file is selected from the suggestions', async () => {
        // Arrange
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: { suggester: jest.fn().mockResolvedValue(undefined) }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(noticeSpy).toHaveBeenCalledWith(
            'No annotations file selected. Aborting import.',
            BUSINESS_ERROR_COLOR
        );
    });
    it.todo('should read the content of the selected ".annot" file');
    it.todo('should deserialize the fragment of an annotation');
    it.todo('should deserialize the content of an annotation');
    it.todo('should deserialize all the annotations');
    it.todo('should format the annotations in markdown quotes');
    it.todo(
        'should create a markdown file having the name "YYYYMMDDHHmm - Book Title.md"'
    );
    it.todo('should apply the "Livre" template to the markdown file');
    it.todo('should create the author note if it does not already exist');
    it.todo(
        'should reference the author note in the "author" property of the book note'
    );
});
