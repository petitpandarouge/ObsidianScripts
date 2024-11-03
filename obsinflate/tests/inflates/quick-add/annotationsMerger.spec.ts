import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsMerger } from '@obsinflate/inflates/quick-add/annotationsMerger';
import { EpubFiles } from '@obsinflate/inflates/quick-add/annotationsSorter';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotation';
import Chance from 'chance';

describe('AnnotationsMerger', () => {
    it('should not merge anything if there is no file', () => {
        // Arrange
        const epubFiles = { files: [] };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of a same file path if there is only one annotation', () => {
        // Arrange
        const file1Annotation = new MockAnnotation(
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
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of different file pathes', () => {
        // Arrange
        const file1Annotation = new MockAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const file2Annotation = new MockAnnotation(
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
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should not merge the annotations of a same file path if the fragments do not overlap', () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 2, max: 10 });
        const epubFiles: EpubFiles = { files: [] };
        for (let i = 0; i < filesCount; i++) {
            const annotationsCount = chance.integer({ min: 1, max: 10 });
            const annotations = [
                new MockAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            ];
            for (let j = 1; j < annotationsCount; j++) {
                annotations.push(
                    new MockAnnotation(
                        EpubPoint.FromString(
                            EpubPointGenerator.generateFromWithOffset(
                                annotations[annotations.length - 1].target
                                    .fragment.end
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
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should merge the annotations of a same file path if the fragments overlap', () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 2, max: 10 });
        const epubFiles: EpubFiles = { files: [] };
        for (let i = 0; i < filesCount; i++) {
            const annotationsCount = chance.integer({ min: 2, max: 10 });
            const annotations = [
                new MockAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            ];
            for (let j = 1; j < annotationsCount; j++) {
                annotations.push(
                    new MockAnnotation(
                        annotations[annotations.length - 1].target.fragment.end
                    )
                );
            }
            epubFiles.files.push({
                path: annotations[0].target.fragment.start.filePath,
                annotations
            });
        }
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        const mergedFiles = epubFiles.files.map((file) => {
            return {
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
                        },
                        content: {
                            text: file.annotations
                                .map((annotation) => annotation.content.text)
                                .join(' ')
                        }
                    }
                ]
            };
        });
        expect(mergedAnnotations).toEqual({ files: mergedFiles });
    });
});
