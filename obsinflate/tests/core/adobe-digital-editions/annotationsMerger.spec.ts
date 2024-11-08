import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsMerger } from '@obsinflate/core/adobe-digital-editions/annotationsMerger';
import { IAnnotationsSorter } from '@obsinflate/core/adobe-digital-editions/annotationsSorter';
import {
    EpubFile,
    EpubFiles
} from '@obsinflate/core/adobe-digital-editions/epubFile';
import { Annotation } from '@obsinflate/core/adobe-digital-editions/annotations';
import {
    EpubPointGenerator,
    OffsetOperation
} from '@obsinflate/tests/data/epubPointGenerator';
import { StubAnnotation } from '@obsinflate/tests/doubles/stubAnnotation';
import Chance from 'chance';
import { mock } from 'jest-mock-extended';

describe('AnnotationsMerger', () => {
    it('should call the sorter before trying to merge the annotations', async () => {
        // Arrange
        const annotations: Annotation[] = [];
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue({ files: [] })
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        merger.merge(annotations);
        // Assert
        expect(mockSorter.sort).toHaveBeenCalledTimes(1);
        expect(mockSorter.sort).toHaveBeenCalledWith(annotations);
    });
    it('should not merge anything if there is no file', () => {
        // Arrange
        const epubFiles = { files: [] };
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue(epubFiles)
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        const mergedAnnotations = merger.merge([]);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of a same file path if there is only one annotation', () => {
        // Arrange
        const file1Annotation = new StubAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const epubFiles = {
            files: [
                {
                    path: file1Annotation.target.fragment.start.filePath,
                    annotations: [file1Annotation]
                }
            ]
        };
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue(epubFiles)
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        const mergedAnnotations = merger.merge([]);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of different file pathes', () => {
        // Arrange
        const file1Annotation = new StubAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const file2Annotation = new StubAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const epubFiles = {
            files: [
                {
                    path: file1Annotation.target.fragment.start.filePath,
                    annotations: [file1Annotation]
                },
                {
                    path: file2Annotation.target.fragment.start.filePath,
                    annotations: [file2Annotation]
                }
            ]
        };
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue(epubFiles)
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        const mergedAnnotations = merger.merge([]);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of a same file path if the fragments do not overlap nor stick', () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 2, max: 10 });
        const epubFiles: EpubFiles = { files: [] };
        for (let i = 0; i < filesCount; i++) {
            const annotationsCount = chance.integer({ min: 1, max: 10 });
            const annotations = [
                new StubAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            ];
            for (let j = 1; j < annotationsCount; j++) {
                annotations.push(
                    new StubAnnotation(
                        EpubPoint.FromString(
                            EpubPointGenerator.generateFromWithOffset(
                                annotations[annotations.length - 1].target
                                    .fragment.end,
                                {
                                    operation: OffsetOperation.Random,
                                    range: {
                                        min: 2,
                                        max: 100
                                    }
                                }
                            ).pointAsString
                        )
                    )
                );
            }
            epubFiles.files.push({
                path: annotations[0].target.fragment.start.filePath,
                annotations
            });
        }
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue(epubFiles)
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        const mergedAnnotations = merger.merge([]);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should merge the annotations of a same file path if the fragments overlap or stick', () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 2, max: 10 });
        const epubFiles: EpubFiles = { files: [] };
        for (let i = 0; i < filesCount; i++) {
            const annotationsCount = chance.integer({ min: 2, max: 10 });
            const annotations = [
                new StubAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            ];
            for (let j = 1; j < annotationsCount; j++) {
                if (chance.bool()) {
                    annotations.push(
                        new StubAnnotation(
                            annotations[
                                annotations.length - 1
                            ].target.fragment.end
                        )
                    );
                } else {
                    annotations.push(
                        new StubAnnotation(
                            EpubPoint.FromString(
                                EpubPointGenerator.generateFromWithOffset(
                                    annotations[annotations.length - 1].target
                                        .fragment.end,
                                    {
                                        operation: OffsetOperation.AddOnOffset,
                                        range: {
                                            min: 1,
                                            max: 1
                                        }
                                    }
                                ).pointAsString
                            )
                        )
                    );
                }
            }
            epubFiles.files.push({
                path: annotations[0].target.fragment.start.filePath,
                annotations
            });
        }
        const mockSorter = mock<IAnnotationsSorter>({
            sort: jest.fn().mockReturnValue(epubFiles)
        });
        const merger = new AnnotationsMerger(mockSorter);
        // Act
        const mergedAnnotations = merger.merge([]);
        // Assert
        const mergedFiles = epubFiles.files.map((file) => {
            const result: EpubFile = {
                path: file.annotations[0].target.fragment.start.filePath,
                annotations: [
                    {
                        target: {
                            fragment: {
                                start: file.annotations[0].target.fragment
                                    .start,
                                end: file.annotations[
                                    file.annotations.length - 1
                                ].target.fragment.end,
                                text: file.annotations
                                    .map(
                                        (annotation) =>
                                            annotation.target.fragment.text
                                    )
                                    .join(' ')
                            }
                        }
                    }
                ]
            };
            if (file.annotations.some((annotation) => annotation.content)) {
                result.annotations[0].content = {
                    text: file.annotations
                        .filter((annotation) => annotation.content)
                        .map((annotation) => annotation.content!.text)
                        .join(' ')
                };
            }
            return result;
        });
        expect(mergedAnnotations).toEqual({ files: mergedFiles });
    });
});
