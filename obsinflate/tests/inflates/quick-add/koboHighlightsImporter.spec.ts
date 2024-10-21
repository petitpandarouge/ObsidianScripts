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
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { BUSINESS_ERROR_COLOR } from '@obsinflate/api/obsidian/color';
import {
    Annotations,
    IAnnotationsReader
} from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { IFormatter } from '@obsinflate/infrastructure/formatter';
import { IUniqueNoteCreator } from '@obsinflate/core/uniqueNoteCreator';

describe('KoboHighlightsImporter', () => {
    it('should suggest the book highlights to import from the "Digital Editions/Annotations" directory ".annot" files', async () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: File[] = [];
        for (let i = 0; i < filesCount; i++) {
            files.push(
                mock<File>({
                    path: `${chance.sentence()}${ANNOTATIONS_FILE_EXTENSION}`
                })
            );
        }
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue(files)
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue({
                annotationSet: {
                    publication: { title: 'Book Title', creator: 'Author' },
                    annotation: []
                }
            })
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
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
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue({
                annotationSet: {
                    publication: { title: 'Book Title', creator: 'Author' },
                    annotation: []
                }
            })
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
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
    it('should deserialize the content of the selected ".annot" file', async () => {
        // Arrange
        const chance = new Chance();
        const mockFile = mock<File>({
            path: `${chance.sentence()}${ANNOTATIONS_FILE_EXTENSION}`
        });
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([mockFile])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue({
                annotationSet: {
                    publication: { title: 'Book Title', creator: 'Author' },
                    annotation: []
                }
            })
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(mockFile.path)
            }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockAnnotationsReader.read).toHaveBeenCalledWith(mockFile);
    });
    it('should format the annotations target fragment text in markdown quotes', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const annotations: Annotations = {
            annotationSet: {
                publication: { title: 'Book Title', creator: 'Author' },
                annotation: []
            }
        };
        const annotationsCount = chance.integer({ min: 1, max: 10 });
        for (let i = 0; i < annotationsCount; i++) {
            annotations.annotationSet.annotation.push({
                target: {
                    fragment: { text: `${chance.sentence()}` }
                },
                content: { text: `${chance.sentence()}` }
            });
        }
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            // Empty string is returned to prevent the NoAnnotationsFileSelectedError error to be raised.
            quickAddApi: { suggester: jest.fn().mockResolvedValue('') }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledTimes(1);
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledWith(
            annotations
        );
    });
    it('should create a markdown file having the name "YYYYMMDDHHmm - Book Title.md"', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockBookTitle = chance.sentence();
        const annotations: Annotations = {
            annotationSet: {
                publication: { title: mockBookTitle, creator: 'Author' },
                annotation: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            // Empty string is returned to prevent the NoAnnotationsFileSelectedError error to be raised.
            quickAddApi: { suggester: jest.fn().mockResolvedValue('') }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockUniqueNoteCreator.create).toHaveBeenCalledTimes(1);
        expect(mockUniqueNoteCreator.create).toHaveBeenCalledWith(
            '06 GARDEN/Livres',
            annotations.annotationSet.publication.title,
            expect.any(String)
        );
    });
    it.todo('should apply the "Livre" template to the markdown file');
    it.todo('should create the author note if it does not already exist');
    it.todo(
        'should reference the author note in the "author" property of the book note'
    );
});
