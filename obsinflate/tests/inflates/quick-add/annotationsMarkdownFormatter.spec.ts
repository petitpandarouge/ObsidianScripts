import { AnnotationsMarkdownFormatter } from '@obsinflate/inflates/quick-add/annotationsMarkdownFormatter';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';
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
            annotations.annotationSet.annotations.push({
                target: {
                    fragment: {
                        text: chance.sentence(),
                        start: {
                            filePath: chance.word(),
                            elementIndexes: [1],
                            offset: 1,
                            isPositionned: jest.fn()
                        },
                        end: {
                            filePath: chance.word(),
                            elementIndexes: [1],
                            offset: 1,
                            isPositionned: jest.fn()
                        }
                    }
                },
                content: { text: chance.sentence() }
            });
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
