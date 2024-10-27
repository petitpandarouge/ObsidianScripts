import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsSorter } from '@obsinflate/inflates/quick-add/annotationsSorter';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotations';

describe('AnnotationsSorter', () => {
    it('should sort the annotations of a same file path by fragment start', () => {
        // Arrange
        const annotation1 = new MockAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const annotation2 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    annotation1.target.fragment.start
                ).pointAsString
            )
        );
        const annotation3 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    annotation2.target.fragment.start
                ).pointAsString
            )
        );
        const annotation4 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    annotation3.target.fragment.start
                ).pointAsString
            )
        );
        const annotation5 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    annotation4.target.fragment.start
                ).pointAsString
            )
        );
        const annotations = [
            annotation3,
            annotation1,
            annotation4,
            annotation5,
            annotation2
        ];
        const sorter = new AnnotationsSorter();
        // Act
        const result = sorter.sort(annotations);
        // Assert
        expect(result).toEqual([
            {
                path: annotation1.target.fragment.start.filePath,
                annotations: [
                    annotation1,
                    annotation2,
                    annotation3,
                    annotation4,
                    annotation5
                ]
            }
        ]);
    });
    it('should sort the annotations of different file paths by file path', () => {
        // Arrange
        const file1Annotation1 = new MockAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const file1Annotation2 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    file1Annotation1.target.fragment.start
                ).pointAsString
            )
        );
        const file1Annotation3 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    file1Annotation2.target.fragment.start
                ).pointAsString
            )
        );
        const file2Annotation1 = new MockAnnotation(
            EpubPoint.FromString(EpubPointGenerator.generate().pointAsString)
        );
        const file2Annotation2 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    file2Annotation1.target.fragment.start
                ).pointAsString
            )
        );
        const file2Annotation3 = new MockAnnotation(
            EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(
                    file2Annotation2.target.fragment.start
                ).pointAsString
            )
        );
        const annotations = [
            file1Annotation3,
            file2Annotation1,
            file2Annotation3,
            file1Annotation2,
            file2Annotation2,
            file1Annotation1
        ];
        const sorter = new AnnotationsSorter();
        // Act
        const result = sorter.sort(annotations);
        // Assert
        expect(result).toEqual([
            {
                path: file1Annotation1.target.fragment.start.filePath,
                annotations: [
                    file1Annotation1,
                    file1Annotation2,
                    file1Annotation3
                ]
            },
            {
                path: file2Annotation1.target.fragment.start.filePath,
                annotations: [
                    file2Annotation1,
                    file2Annotation2,
                    file2Annotation3
                ]
            }
        ]);
    });
});
