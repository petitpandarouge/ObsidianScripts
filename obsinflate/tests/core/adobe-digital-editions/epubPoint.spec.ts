import { BadEpubFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubFilePathFormatError';
import {
    EPUB_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
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
    it('should raise an error if the file path does not begin by OEBPS', async () => {
        // Arrange
        const chance = new Chance();
        const filePath = `${chance.word()}/${chance.word()}.xhtml`;
        const pathComponents = [1];
        const offset = 1;
        const pointAsString = `${filePath}#point(/${pathComponents.join('/')}:${offset})`;
        // Act
        const action = () => EpubPoint.FromString(pointAsString);
        // Assert
        expect(action).toThrow(
            BadEpubFilePathFormatError.DoesNotBeginByOEBPS()
        );
    });
    it('should raise an error if the file path does not end by .xhtml', async () => {
        // Arrange
        const chance = new Chance();
        const filePath = `${EPUB_FILE_PATH_PREFIX}${chance.word()}/${chance.word()}`;
        const pathComponents = [1];
        const offset = 1;
        const pointAsString = `${filePath}#point(/${pathComponents.join('/')}:${offset})`;
        // Act
        const action = () => EpubPoint.FromString(pointAsString);
        // Assert
        expect(action).toThrow(BadEpubFilePathFormatError.DoesNotEndByXHTML());
    });
    it.todo('should be able the parse a string that does not contain offset');
    it.todo(
        'should be able to determine if an EpubPoint is before another EpubPoint'
    );
});
