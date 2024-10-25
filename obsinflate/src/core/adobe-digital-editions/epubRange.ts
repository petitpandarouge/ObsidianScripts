import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { EpubRangeLimitsNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangeLimitsNotInTheSameFileError';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';

export class EpubRange {
    constructor(
        public start: EpubPoint,
        public end: EpubPoint
    ) {
        if (start.filePath !== end.filePath) {
            throw new EpubRangeLimitsNotInTheSameFileError();
        }
    }

    isPositionned(other: EpubRange): EpubRangePosition {
        if (this.end.isPositionned(other.start) === EpubPointPosition.Before) {
            return EpubRangePosition.Before;
        }
        throw new Error('Method not implemented.');
    }
}
