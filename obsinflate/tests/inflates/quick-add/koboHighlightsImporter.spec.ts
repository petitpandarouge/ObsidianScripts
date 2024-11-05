import { mock, mockDeep } from 'jest-mock-extended';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import {
    ANNOTATIONS_FILE_EXTENSION,
    ANNOTATIONS_FILES_DIR_PATH,
    BOOK_ANNOTATIONS_VAR_NAME,
    BOOK_AUTHOR_VAR_NAME,
    BOOK_NOTE_DESTINATION_DIR,
    BOOK_TITLE_VAR_NAME,
    KoboHighlightsImporter
} from '@obsinflate/inflates/quick-add/koboHighlightsImporter';
import Chance from 'chance';
import { File, IFileSystem } from '@obsinflate/infrastructure/fileSystem';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { BUSINESS_ERROR_COLOR } from '@obsinflate/api/obsidian/color';
import { IAnnotationsReader } from '@obsinflate/infrastructure/adobe-digital-editions/annotationsReader';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';
import { IFormatter } from '@obsinflate/infrastructure/formatter';
import { IUniqueNoteCreator } from '@obsinflate/core/uniqueNoteCreator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotation';
import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import {
    EpubFile,
    EpubFiles
} from '@obsinflate/inflates/quick-add/annotationsSorter';
import { IAnnotationsMerger } from '@obsinflate/inflates/quick-add/annotationsMerger';

const PREVENT_CRASH_STRING = '';

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
                    publication: {
                        title: PREVENT_CRASH_STRING,
                        creator: PREVENT_CRASH_STRING
                    },
                    annotation: []
                }
            })
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            }
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const noticeSpy = jest.spyOn(errorNoticer as any, 'notice');
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue({
                annotationSet: {
                    publication: {
                        title: PREVENT_CRASH_STRING,
                        creator: PREVENT_CRASH_STRING
                    },
                    annotation: []
                }
            })
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
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
                    publication: {
                        title: PREVENT_CRASH_STRING,
                        creator: PREVENT_CRASH_STRING
                    },
                    annotation: []
                }
            })
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
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
    it('should sort the annotations file path', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const annotations: Annotations = {
            annotationSet: {
                publication: {
                    title: PREVENT_CRASH_STRING,
                    creator: PREVENT_CRASH_STRING
                },
                annotations: []
            }
        };
        const annotationsCount = chance.integer({ min: 1, max: 10 });
        for (let i = 0; i < annotationsCount; i++) {
            annotations.annotationSet.annotations.push(
                new MockAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            );
        }
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
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
        expect(mockAnnotationsMerger.merge).toHaveBeenCalledTimes(1);
        expect(mockAnnotationsMerger.merge).toHaveBeenCalledWith(
            annotations.annotationSet.annotations
        );
    });
    it('should format the annotations target fragment text in markdown quotes', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockResolvedValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue({
                annotationSet: {
                    publication: {
                        title: PREVENT_CRASH_STRING,
                        creator: PREVENT_CRASH_STRING
                    },
                    annotations: []
                }
            })
        });
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: EpubFile[] = [];
        for (let i = 0; i < filesCount; i++) {
            const refPoint = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const file: EpubFile = {
                path: refPoint.filePath,
                annotations: []
            };
            const annotationsCount = chance.integer({ min: 1, max: 10 });
            for (let i = 0; i < annotationsCount; i++) {
                file.annotations.push(
                    new MockAnnotation(
                        EpubPoint.FromString(
                            EpubPointGenerator.generateFromWithOffset(refPoint)
                                .pointAsString
                        )
                    )
                );
            }
            files.push(file);
        }
        const mockAnnotationsMerger = mock<IAnnotationsMerger>({
            merge: jest.fn().mockReturnValue({ files })
        });
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledTimes(1);
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledWith({
            files
        });
    });
    // TODO useless
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
                annotations: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>({
            format: jest.fn().mockReturnValue(PREVENT_CRASH_STRING)
        });
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockUniqueNoteCreator.create).toHaveBeenCalledTimes(1);
        expect(mockUniqueNoteCreator.create).toHaveBeenCalledWith(
            BOOK_NOTE_DESTINATION_DIR,
            annotations.annotationSet.publication.title,
            expect.any(String)
        );
    });
    // TODO useless
    it('should initialize the content of the markdown file with the formatted annotations', async () => {
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
                annotations: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockContent = chance.paragraph();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>({
            format: jest.fn().mockReturnValue(mockContent)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            }
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockUniqueNoteCreator.create).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(String),
            expect.stringMatching(mockContent)
        );
    });
    it('should set the title of the book in the "title" variable', async () => {
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
                publication: {
                    title: mockBookTitle,
                    creator: PREVENT_CRASH_STRING
                },
                annotations: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            },
            variables: {}
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockParams.variables[BOOK_TITLE_VAR_NAME]).toBe(mockBookTitle);
    });
    it('should set the author of the book in the "author" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockAuthor = chance.name();
        const annotations: Annotations = {
            annotationSet: {
                publication: {
                    title: PREVENT_CRASH_STRING,
                    creator: mockAuthor
                },
                annotations: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>();
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            },
            variables: {}
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockParams.variables[BOOK_AUTHOR_VAR_NAME]).toBe(mockAuthor);
    });
    it('should set the formatted annotations in the "annotations" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockFileSystem = mockDeep<IFileSystem>({
            getFiles: jest.fn().mockReturnValue([])
        });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockContent = chance.paragraph();
        const annotations: Annotations = {
            annotationSet: {
                publication: {
                    title: PREVENT_CRASH_STRING,
                    creator: PREVENT_CRASH_STRING
                },
                annotations: []
            }
        };
        const mockAnnotationsReader = mock<IAnnotationsReader>({
            read: jest.fn().mockResolvedValue(annotations)
        });
        const mockAnnotationsMerger = mock<IAnnotationsMerger>();
        const mockMarkdownQuoteFormatter = mock<IFormatter<EpubFiles>>({
            format: jest.fn().mockReturnValue(mockContent)
        });
        const mockUniqueNoteCreator = mock<IUniqueNoteCreator>();
        const importer = new KoboHighlightsImporter(
            mockFileSystem,
            errorNoticer,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter,
            mockUniqueNoteCreator
        );
        const mockParams = mockDeep<Parameters>({
            quickAddApi: {
                suggester: jest.fn().mockResolvedValue(PREVENT_CRASH_STRING)
            },
            variables: {}
        });
        // Act
        await importer.entry(mockParams);
        // Assert
        expect(mockParams.variables[BOOK_ANNOTATIONS_VAR_NAME]).toBe(
            mockContent
        );
    });
    it.todo('should apply the "Livre" template to the markdown file');
    it.todo('should create the author note if it does not already exist');
    it.todo(
        'should reference the author note in the "author" property of the book note'
    );
});
