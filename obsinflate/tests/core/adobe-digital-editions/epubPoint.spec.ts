import { BadEpubPointFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFilePathFormatError';
import { BadEpubPointFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFormatError';
import {
    EPUB_POINT_COMPONENTS_SEPARATOR,
    EPUB_POINT_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import Chance from 'chance';

describe('EpubPoint', () => {
    describe('FromString', () => {
        it('should be able to parse a string into an EpubPoint', () => {
            // Arrange
            const generatedPoint = EpubPointGenerator.generate();
            // Act
            const point = EpubPoint.FromString(generatedPoint.pointAsString);
            // Assert
            expect(point.filePath).toEqual(generatedPoint.filePath);
            expect(point.elementIndexes).toEqual(generatedPoint.elementIndexes);
            expect(point.offset).toEqual(generatedPoint.offset);
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
            const filePath = `${chance.word()}/${chance.word()}${XHTML_FILE_EXTENSION}`;
            const elementIndexes = [1];
            const offset = 1;
            const pointAsString = `${filePath}#point(${EPUB_POINT_COMPONENTS_SEPARATOR}${elementIndexes.join(EPUB_POINT_COMPONENTS_SEPARATOR)}:${offset})`;
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
            const elementIndexes = [1];
            const offset = 1;
            const pointAsString = `${filePath}#point(${EPUB_POINT_COMPONENTS_SEPARATOR}${elementIndexes.join(EPUB_POINT_COMPONENTS_SEPARATOR)}:${offset})`;
            // Act
            const action = () => EpubPoint.FromString(pointAsString);
            // Assert
            expect(action).toThrow(
                BadEpubPointFilePathFormatError.DoesNotEndByXHTML()
            );
        });
    });
    describe('isPositionned', () => {
        it('should return InAnotherFile if both the points are not in the same file', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            // Act
            const result = point1.isPositionned(point2);
            // Assert
            expect(result).toBe(EpubPointPosition.InAnotherFile);
        });
        it('should return Before if the first point is before the second point in the same file', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            // Act
            const result = point1.isPositionned(point2);
            // Assert
            expect(result).toBe(EpubPointPosition.Before);
        });
        it('should return After if the first point is after the second point in the same file', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            // Act
            const result = point2.isPositionned(point1);
            // Assert
            expect(result).toBe(EpubPointPosition.After);
        });
        it('should return Same if the first point is the same as the second point in the same file', () => {
            // Arrange
            const pointAsString = EpubPointGenerator.generate().pointAsString;
            const point1 = EpubPoint.FromString(pointAsString);
            const point2 = EpubPoint.FromString(pointAsString);
            // Act
            const result = point1.isPositionned(point2);
            // Assert
            expect(result).toBe(EpubPointPosition.Same);
        });
    });
});
