import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import Chance from 'chance';

describe('EpubPoint', () => {
    it('should be able to parse a string into an EpubPoint', async () => {
        // Arrange
        const chance = new Chance();
        const filePath = `OEBPS/${chance.word()}/${chance.word()}.xhtml`;
        const pathComponents = [];
        for (let i = 0; i < chance.integer({ min: 1, max: 5 }); i++) {
            pathComponents.push(chance.integer({ min: 1, max: 100 }));
        }
        const offset = chance.integer({ min: 1, max: 100 });
        const pointAsString = `${filePath}#point(/${pathComponents.join('/')}:${offset})`;
        // Act
        const point = EpubPoint.FromString(pointAsString);
        // Assert
        expect(point.filePath).toEqual(filePath);
        expect(point.pathComponents).toEqual(pathComponents);
        expect(point.offset).toEqual(offset);
    });
    it.todo(
        'should be able to determine if an EpubPoint is before another EpubPoint'
    );
    it.todo('should raise an error if the string is not a valid EpubPoint');
});
