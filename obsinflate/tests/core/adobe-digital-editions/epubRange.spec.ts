import {
    EPUB_POINT_FILE_PATH_PREFIX,
    EpubPoint
} from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
import { EpubRangeLimitsNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangeLimitsNotInTheSameFileError';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
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
