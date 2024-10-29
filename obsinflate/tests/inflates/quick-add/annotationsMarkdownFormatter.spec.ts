import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsMarkdownFormatter } from '@obsinflate/inflates/quick-add/annotationsMarkdownFormatter';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotations';
import Chance from 'chance';

describe('AnnotationsMarkdownFormatter', () => {
    it('should format the annotations in markdown', () => {
        // Arrange
        const chance = new Chance();
        const annotationsCount = chance.integer({ min: 1, max: 10 });
        const annotations: Annotations = {
            annotationSet: {
                publication: {
                    title: chance.sentence(),
                    creator: chance.name()
                },
                annotations: []
            }
        };
        for (let i = 0; i < annotationsCount; i++) {
            annotations.annotationSet.annotations.push(
                new MockAnnotation(
                    EpubPoint.FromString(
                        EpubPointGenerator.generate().pointAsString
                    )
                )
            );
        }
        const formatter = new AnnotationsMarkdownFormatter();
        // Act
        const formatted = formatter.format(annotations);
        // Assert
        expect(formatted).toBe(
            `${annotations.annotationSet.annotations
                .map(
                    (annotation) =>
                        `>[!quote]\n>${annotation.target.fragment.text}\n\n${annotation.content.text}`
                )
                .join('\n\n\n')}\n\n\n`
        );
    });
});
