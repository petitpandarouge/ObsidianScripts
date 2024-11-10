import { mock, mockDeep } from 'jest-mock-extended';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { KoboHighlightsExtractor } from '@obsinflate/inflates/quick-add/kobo-highlights-extractor/script';
import { KoboHighlightsImporterSettings } from '@obsinflate/inflates/quick-add/kobo-highlights-extractor/settings';
import { ANNOTATIONS_FILE_EXTENSION } from '@obsinflate/core/adobe-digital-editions/fileExtensions';
import Chance from 'chance';
import { File } from '@obsinflate/infrastructure/fileSystem';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { IAnnotationsReader } from '@obsinflate/core/adobe-digital-editions/annotationsReader';
import { Annotations } from '@obsinflate/core/adobe-digital-editions/annotations';
import { IFormatter } from '@obsinflate/infrastructure/formatter';
import { StubAnnotation } from '@obsinflate/tests/doubles/stubAnnotation';
import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import {
    EpubFile,
    EpubFiles
} from '@obsinflate/core/adobe-digital-editions/epubFile';
import { IAnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { PREVENT_CRASH_STRING } from '@obsinflate/tests/data/constants';

describe('KoboHighlightsExtractor', () => {
    it('should deserialize the content of the input "Settings.annotationsFileVariableName" variable ".annot" file', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>();
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const mockFile = mock<File>({
            path: `${chance.sentence()}${ANNOTATIONS_FILE_EXTENSION}`
        });
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: mockFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(mockAnnotationsReader.read).toHaveBeenCalledWith(mockFile);
    });
    it('should merge the deserialized annotations', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>();
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
                new StubAnnotation(
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const preventCrashFile = mock<File>();
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: preventCrashFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(mockAnnotationsMerger.merge).toHaveBeenCalledTimes(1);
        expect(mockAnnotationsMerger.merge).toHaveBeenCalledWith(
            annotations.annotationSet.annotations
        );
    });
    it('should format the annotations in markdown', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>();
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
                    new StubAnnotation(
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const preventCrashFile = mock<File>();
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: preventCrashFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledTimes(1);
        expect(mockMarkdownQuoteFormatter.format).toHaveBeenCalledWith({
            files
        });
    });
    it('should set the title of the book in the "Settings.bookTitleVariableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>({
            bookTitleVariableName: chance.word()
        });
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const preventCrashFile = mock<File>();
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: preventCrashFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(mockParams.variables[mockSettings.bookTitleVariableName]).toBe(
            mockBookTitle
        );
    });
    it('should set the author of the book in the "Settings.bookAuthorVariableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>({
            bookAuthorVariableName: chance.word()
        });
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const preventCrashFile = mock<File>();
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: preventCrashFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(mockParams.variables[mockSettings.bookAuthorVariableName]).toBe(
            mockAuthor
        );
    });
    it('should set the formatted annotations in the "Settings.bookAnnotationsVariableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = mock<KoboHighlightsImporterSettings>({
            bookAnnotationsVariableName: chance.word()
        });
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
        const extractor = new KoboHighlightsExtractor(
            errorNoticer,
            mockSettings,
            mockAnnotationsReader,
            mockAnnotationsMerger,
            mockMarkdownQuoteFormatter
        );
        const preventCrashFile = mock<File>();
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.annotationsFileVariableName]: preventCrashFile
            }
        });
        // Act
        await extractor.entry(mockParams);
        // Assert
        expect(
            mockParams.variables[mockSettings.bookAnnotationsVariableName]
        ).toBe(mockContent);
    });
});
