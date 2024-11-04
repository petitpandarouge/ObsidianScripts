import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
import { EpubRangeLimitsNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangeLimitsNotInTheSameFileError';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
import { EpubRangesNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangesNotInTheSameFileError';
import { InvalidEpubRangeLimitsError } from '@obsinflate/core/adobe-digital-editions/invalidEpubRangeLimitsError';
import {
    EpubPointGenerator,
    OffsetOperation
} from '@obsinflate/tests/data/epubPointGenerator';
import { MockAnnotation } from '@obsinflate/tests/doubles/mockAnnotation';

describe('EpubRange', () => {
    it('should raise error if the range points are from different XHTML files', () => {
        // Arrange
        const start = EpubPoint.FromString(
            EpubPointGenerator.generate().pointAsString
        );
        const end = EpubPoint.FromString(
            EpubPointGenerator.generate().pointAsString
        );
        // Act
        const action = () => new EpubRange(new MockAnnotation(start, end));
        // Assert
        expect(action).toThrow(EpubRangeLimitsNotInTheSameFileError);
    });
    it('should raise an error if the start point is after the end point', () => {
        // Arrange
        const end = EpubPoint.FromString(
            EpubPointGenerator.generate().pointAsString
        );
        const start = EpubPoint.FromString(
            EpubPointGenerator.generateFromWithOffset(end).pointAsString
        );
        // Act
        const action = () => new EpubRange(new MockAnnotation(start, end));
        // Assert
        expect(action).toThrow(InvalidEpubRangeLimitsError);
    });
    describe('isPositionned', () => {
        it('should return Before if the end point is before the other range start point', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            const point3 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point2).pointAsString
            );
            const point4 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point3).pointAsString
            );
            const range1 = new EpubRange(new MockAnnotation(point1, point2));
            const range2 = new EpubRange(new MockAnnotation(point3, point4));
            // Act
            const result = range1.isPositionned(range2);
            // Assert
            expect(result).toBe(EpubRangePosition.Before);
        });
        it('should return After if the start point is after the other range end point', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            const point3 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point2).pointAsString
            );
            const point4 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point3).pointAsString
            );
            const range1 = new EpubRange(new MockAnnotation(point3, point4));
            const range2 = new EpubRange(new MockAnnotation(point1, point2));
            // Act
            const result = range1.isPositionned(range2);
            // Assert
            expect(result).toBe(EpubRangePosition.After);
        });
        it('should return Overlap if the start point is before the other range end point or the end point is after the other range start point', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            const point3 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point2).pointAsString
            );
            const point4 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point3).pointAsString
            );
            const ranges1 = [
                new EpubRange(new MockAnnotation(point2, point4)),
                new EpubRange(new MockAnnotation(point1, point3)),
                new EpubRange(new MockAnnotation(point1, point4)),
                new EpubRange(new MockAnnotation(point2, point3))
            ];
            const ranges2 = [
                new EpubRange(new MockAnnotation(point1, point3)),
                new EpubRange(new MockAnnotation(point2, point4)),
                new EpubRange(new MockAnnotation(point2, point3)),
                new EpubRange(new MockAnnotation(point1, point4))
            ];
            for (let i = 0; i < ranges1.length; i++) {
                // Act
                const result = ranges1[i].isPositionned(ranges2[i]);
                // Assert
                expect(result).toBe(EpubRangePosition.Overlap);
            }
        });
        it('should return Overlap if the start point is the same as the other range end point or the end point is the same as the other range start point', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            const point3 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point2).pointAsString
            );
            const ranges1 = [
                new EpubRange(new MockAnnotation(point1, point2)),
                new EpubRange(new MockAnnotation(point2, point3))
            ];
            const ranges2 = [
                new EpubRange(new MockAnnotation(point2, point3)),
                new EpubRange(new MockAnnotation(point1, point2))
            ];
            for (let i = 0; i < ranges1.length; i++) {
                // Act
                const result = ranges1[i].isPositionned(ranges2[i]);
                // Assert
                expect(result).toBe(EpubRangePosition.Overlap);
            }
        });
        it('should return Stick and Before if the start point is right after the other range end point', () => {
            // Arrange
            const point1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const point2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point1).pointAsString
            );
            const point3 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point2, {
                    operation: OffsetOperation.AddOnOffset,
                    range: { min: 1, max: 1 }
                }).pointAsString
            );
            const point4 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(point3).pointAsString
            );
            const range1 = new EpubRange(new MockAnnotation(point1, point2));
            const range2 = new EpubRange(new MockAnnotation(point3, point4));
            // Act
            const result = range1.isPositionned(range2);
            // Assert
            expect(result).toBe(
                EpubRangePosition.Stick | EpubRangePosition.Before
            );
        });
        it('should raise an error if the ranges are from different XHTML files', () => {
            // Arrange
            const start1 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const end1 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(start1).pointAsString
            );
            const start2 = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const end2 = EpubPoint.FromString(
                EpubPointGenerator.generateFromWithOffset(start2).pointAsString
            );
            const range1 = new EpubRange(new MockAnnotation(start1, end1));
            const range2 = new EpubRange(new MockAnnotation(start2, end2));
            // Act
            const action = () => range1.isPositionned(range2);
            // Assert
            expect(action).toThrow(EpubRangesNotInTheSameFileError);
        });
    });
});
