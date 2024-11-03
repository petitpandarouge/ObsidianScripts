import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsMerger } from '@obsinflate/inflates/quick-add/annotationsMerger';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotations';

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
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    file1Annotation1.target.fragment.end
                ).pointAsString
            )
        );
        const epubFiles = {
            files: [
                {
                    path: file1Annotation1.target.fragment.start.filePath,
                    annotations: [file1Annotation1, file1Annotation2]
                }
            ]
        };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual(epubFiles);
    });
    it('should merge two annotations of a same file path if the fragments overlap', () => {
        // Arrange
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/1:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)')
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/15:1)')
        );
        const epubFiles = {
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [file1Annotation1, file1Annotation2]
                }
            ]
        };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual({
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        {
                            target: {
                                fragment: {
                                    start: file1Annotation1.target.fragment
                                        .start,
                                    end: file1Annotation2.target.fragment.end,
                                    text: `${file1Annotation1.target.fragment.text} ${file1Annotation2.target.fragment.text}`
                                }
                            },
                            content: {
                                text: `${file1Annotation1.content.text} ${file1Annotation2.content.text}`
                            }
                        }
                    ]
                }
            ]
        });
    });
    it('should merge tree annotations of a same file path if the fragments overlap', () => {
        // Arrange
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/1:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)')
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/15:1)')
        );
        const file1Annotation3 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/14:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/22:1)')
        );
        const epubFiles = {
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        file1Annotation1,
                        file1Annotation2,
                        file1Annotation3
                    ]
                }
            ]
        };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual({
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        {
                            target: {
                                fragment: {
                                    start: file1Annotation1.target.fragment
                                        .start,
                                    end: file1Annotation3.target.fragment.end,
                                    text: `${file1Annotation1.target.fragment.text} ${file1Annotation2.target.fragment.text} ${file1Annotation3.target.fragment.text}`
                                }
                            },
                            content: {
                                text: `${file1Annotation1.content.text} ${file1Annotation2.content.text} ${file1Annotation3.content.text}`
                            }
                        }
                    ]
                }
            ]
        });
    });
    it('should merge four annotations of a same file path if the fragments overlap', () => {
        // Arrange
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/1:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)')
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/15:1)')
        );
        const file1Annotation3 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/14:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/22:1)')
        );
        const file1Annotation4 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/19:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/30:1)')
        );
        const epubFiles = {
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        file1Annotation1,
                        file1Annotation2,
                        file1Annotation3,
                        file1Annotation4
                    ]
                }
            ]
        };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual({
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        {
                            target: {
                                fragment: {
                                    start: file1Annotation1.target.fragment
                                        .start,
                                    end: file1Annotation4.target.fragment.end,
                                    text: `${file1Annotation1.target.fragment.text} ${file1Annotation2.target.fragment.text} ${file1Annotation3.target.fragment.text} ${file1Annotation4.target.fragment.text}`
                                }
                            },
                            content: {
                                text: `${file1Annotation1.content.text} ${file1Annotation2.content.text} ${file1Annotation3.content.text} ${file1Annotation4.content.text}`
                            }
                        }
                    ]
                }
            ]
        });
    });
    it('should merge five annotations of a same file path if the fragments overlap', () => {
        // Arrange
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/1:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)')
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/12:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/15:1)')
        );
        const file1Annotation3 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/14:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/22:1)')
        );
        const file1Annotation4 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/19:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/30:1)')
        );
        const file1Annotation5 = new MockAnnotation(
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/30:1)'),
            EpubPoint.FromString('OEBPS/Text/Text.xhtml#point(/37:1)')
        );
        const epubFiles = {
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        file1Annotation1,
                        file1Annotation2,
                        file1Annotation3,
                        file1Annotation4,
                        file1Annotation5
                    ]
                }
            ]
        };
        const merger = new AnnotationsMerger();
        // Act
        const mergedAnnotations = merger.merge(epubFiles);
        // Assert
        expect(mergedAnnotations).toEqual({
            files: [
                {
                    path: 'OEBPS/Text/Text.xhtml',
                    annotations: [
                        {
                            target: {
                                fragment: {
                                    start: file1Annotation1.target.fragment
                                        .start,
                                    end: file1Annotation5.target.fragment.end,
                                    text: `${file1Annotation1.target.fragment.text} ${file1Annotation2.target.fragment.text} ${file1Annotation3.target.fragment.text} ${file1Annotation4.target.fragment.text} ${file1Annotation5.target.fragment.text}`
                                }
                            },
                            content: {
                                text: `${file1Annotation1.content.text} ${file1Annotation2.content.text} ${file1Annotation3.content.text} ${file1Annotation4.content.text} ${file1Annotation5.content.text}`
                            }
                        }
                    ]
                }
            ]
        });
    });
    // it('should merge the annotations of a same file path if the fragments overlap', () => {
    //     // Arrange
    //     const file1Annotation1 = new MockAnnotation(
    //         EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
    //     );
    //     const file1Annotation2 = new MockAnnotation(
    //         EpubPoint.FromString(
    //             EpubPointGenerator.generateFromWithOffset(
    //                 file1Annotation1.target.fragment.end
    //             ).pointAsString
    //         )
    //     );
    //     const file1Annotation3 = new MockAnnotation(
    //         file1Annotation2.target.fragment.end
    //     );
    //     const epubFiles = {
    //         files: [
    //             {
    //                 path: file1Annotation1.target.fragment.start.filePath,
    //                 annotations: [
    //                     file1Annotation1,
    //                     file1Annotation2,
    //                     file1Annotation3
    //                 ]
    //             }
    //         ]
    //     };
    //     const merger = new AnnotationsMerger();
    //     // Act
    //     const mergedAnnotations = merger.merge(epubFiles);
    //     // Assert
    //     expect(mergedAnnotations).toEqual({
    //         files: [
    //             {
    //                 path: file1Annotation1.target.fragment.start.filePath,
    //                 annotations: [
    //                     file1Annotation1,
    //                     {
    //                         target: {
    //                             fragment: {
    //                                 start: file1Annotation2.target.fragment
    //                                     .start,
    //                                 end: file1Annotation3.target.fragment.end,
    //                                 text: `${file1Annotation2.target.fragment.text} ${file1Annotation3.target.fragment.text}`
    //                             }
    //                         },
    //                         content: {
    //                             text: `${file1Annotation2.content.text} ${file1Annotation3.content.text}`
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
    //     });
    // });
});
