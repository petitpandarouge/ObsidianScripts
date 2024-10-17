import { AnnotationToMarkdownQuoteFormatter } from '@obsinflate/inflates/quick-add/annotationToMarkdownQuoteFormatter';
import Chance from 'chance';

describe('AnnotationToMarkdownQuoteFormatter', () => {
    it('should format the target fragment text in markdown quote', () => {
        // Arrange
        const chance = new Chance();
        const annotation = {
            target: {
                fragment: { text: chance.sentence() }
            },
            content: { text: chance.sentence() }
        };
        const formatter = new AnnotationToMarkdownQuoteFormatter();
        // Act
        const formatted = formatter.format(annotation);
        // Assert
        expect(formatted).toBe(
            `>[!quote]\n>${annotation.target.fragment.text}`
        );
    });
});
