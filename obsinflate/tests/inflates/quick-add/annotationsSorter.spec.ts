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
        sorter.sort(annotations);
        // Assert
        expect(annotations).toEqual([
            annotation1,
            annotation2,
            annotation3,
            annotation4,
            annotation5
        ]);
    });
    it.todo('should sort the annotations of different file paths by file path');
});
