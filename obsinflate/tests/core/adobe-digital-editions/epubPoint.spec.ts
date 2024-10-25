import { BadEpubPointFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFilePathFormatError';
import { BadEpubPointFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFormatError';
import {
    EPUB_POINT_COMPONENTS_SEPARATOR,
    EPUB_POINT_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import Chance from 'chance';

describe('EpubPoint', () => {
    describe('FromString', () => {
        it('should be able to parse a string into an EpubPoint', () => {
            // Arrange
            const chance = new Chance();
            const filePath = `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}/${chance.word()}${XHTML_FILE_EXTENSION}`;
            const pathComponents = [];
            for (let i = 0; i < chance.integer({ min: 1, max: 5 }); i++) {
                pathComponents.push(chance.integer({ min: 1, max: 100 }));
            }
            const offset = chance.integer({ min: 1, max: 100 });
            const pointAsString = `${filePath}#point(${EPUB_POINT_COMPONENTS_SEPARATOR}${pathComponents.join(EPUB_POINT_COMPONENTS_SEPARATOR)}:${offset})`;
            // Act
            const point = EpubPoint.FromString(pointAsString);
            // Assert
            expect(point.filePath).toEqual(filePath);
            expect(point.pathComponents).toEqual(pathComponents);
            expect(point.offset).toEqual(offset);
        });
        it('should raise an error if the base format is not respected', () => {
            // Arrange
            const chance = new Chance();
            const pointAsString = chance.word();
            // Act
            const action = () => EpubPoint.FromString(pointAsString);
            // Assert
            expect(action).toThrow(BadEpubPointFormatError);
        });
        it('should raise an error if the file path does not begin by OEBPS', () => {
            // Arrange
            const chance = new Chance();
            const filePath = `${chance.word()}/${chance.word()}.xhtml`;
            const pathComponents = [1];
            const offset = 1;
            const pointAsString = `${filePath}#point(${EPUB_POINT_COMPONENTS_SEPARATOR}${pathComponents.join(EPUB_POINT_COMPONENTS_SEPARATOR)}:${offset})`;
            // Act
            const action = () => EpubPoint.FromString(pointAsString);
            // Assert
            expect(action).toThrow(
                BadEpubPointFilePathFormatError.DoesNotBeginByOEBPS()
            );
        });
        it('should raise an error if the file path does not end by .xhtml', () => {
            // Arrange
            const chance = new Chance();
            const filePath = `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}/${chance.word()}`;
            const pathComponents = [1];
            const offset = 1;
            const pointAsString = `${filePath}#point(${EPUB_POINT_COMPONENTS_SEPARATOR}${pathComponents.join(EPUB_POINT_COMPONENTS_SEPARATOR)}:${offset})`;
            // Act
            const action = () => EpubPoint.FromString(pointAsString);
            // Assert
            expect(action).toThrow(
                BadEpubPointFilePathFormatError.DoesNotEndByXHTML()
            );
        });
    });
    describe('isPositionned', () => {
        it('should return InAnotherFile if both the points are not in the same file path', () => {
            // Arrange
            const chance = new Chance();
            const point1 = EpubPoint.FromString(
                `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}${XHTML_FILE_EXTENSION}#point(/1/4/173:27)`
            );
            const point2 = EpubPoint.FromString(
                `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}${XHTML_FILE_EXTENSION}#point(/1/4/174:27)`
            );
            // Act
            const result = point1.isPositionned(point2);
            // Assert
            expect(result).toBe(EpubPointPosition.InAnotherFile);
        });
    });
});
