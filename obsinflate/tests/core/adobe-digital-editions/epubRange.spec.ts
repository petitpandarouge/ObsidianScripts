import {
    EPUB_POINT_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
import { EpubRangeLimitsNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangeLimitsNotInTheSameFileError';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
import { InvalidEpubRangeLimitsError } from '@obsinflate/core/adobe-digital-editions/invalidEpubRangeLimitsError';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';
import Chance from 'chance';

describe('EpubRange', () => {
    it('should raise error if the range points are from different XHTML files', () => {
        // Arrange
        const chance = new Chance();
        const start = EpubPoint.FromString(
            `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}${XHTML_FILE_EXTENSION}#point(/1/4/173:27)`
        );
        const end = EpubPoint.FromString(
            `${EPUB_POINT_FILE_PATH_PREFIX}${chance.word()}${XHTML_FILE_EXTENSION}#point(/1/4/174:27)`
        );
        // Act
        const action = () => new EpubRange(start, end);
        // Assert
        expect(action).toThrow(EpubRangeLimitsNotInTheSameFileError);
    });
    it('should raise an error if the start point is after the end point', () => {
        // Arrange
        const start = EpubPoint.FromString(
            'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
        );
        const end = EpubPoint.FromString(
            'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
        );
        // Act
        const action = () => new EpubRange(start, end);
        // Assert
        expect(action).toThrow(InvalidEpubRangeLimitsError);
    });
    describe('isPositionned', () => {
        it('should return Before if the end point is before the other range start point', () => {
            // Arrange
            const range1 = new EpubRange(
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
                ),
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
                )
            );
            const range2 = new EpubRange(
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/175:27)'
                ),
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/176:27)'
                )
            );
            // Act
            const result = range1.isPositionned(range2);
            // Assert
            expect(result).toBe(EpubRangePosition.Before);
        });
        it('should return After if the start point is after the other range end point', () => {
            // Arrange
            const range1 = new EpubRange(
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:28)'
                ),
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
                )
            );
            const range2 = new EpubRange(
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/172:27)'
                ),
                EpubPoint.FromString(
                    'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
                )
            );
            // Act
            const result = range1.isPositionned(range2);
            // Assert
            expect(result).toBe(EpubRangePosition.After);
        });
        it('should return Overlap if the start point is before the other range end point or the end point is after the other range start point', () => {
            // Arrange
            const ranges1 = [
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/172:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/172:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/172:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/175:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/172:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/175:27)'
                    )
                )
            ];
            const ranges2 = [
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/171:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/175:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
                    )
                ),
                new EpubRange(
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/171:27)'
                    ),
                    EpubPoint.FromString(
                        'OEBPS/Text/Chapter05.xhtml#point(/1/4/176:27)'
                    )
                )
            ];
            for (let i = 0; i < ranges1.length; i++) {
                // Act
                const result = ranges1[i].isPositionned(ranges2[i]);
                // Assert
                expect(result).toBe(EpubRangePosition.Overlap);
            }
        });
    });
    it('should be able to sort a set of ranges from the same XHTML file', async () => {
        // // Arrange
        // const ranges: EpubRange[] = [
        //     new EpubRange(
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/173:27)'
        //         ),
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/174:27)'
        //         )
        //     ),
        //     new EpubRange(
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/169/1:1)'
        //         ),
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/172/1:0)'
        //         )
        //     ),
        //     new EpubRange(
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/75:1)'
        //         ),
        //         EpubPoint.FromString(
        //             'OEBPS/Text/Chapter05.xhtml#point(/1/4/78:0)'
        //         )
        //     )
        // ];
        // // Act
        // ranges.sort((a, b) => (a.isBefore(b) ? -1 : 1));
        // // Assert
        // expect(ranges[0].start.pathComponents).toEqual([1, 4, 75]);
        // expect(ranges[1].start.pathComponents).toEqual([1, 4, 169, 1]);
        // expect(ranges[2].start.pathComponents).toEqual([1, 4, 173]);
    });
});
