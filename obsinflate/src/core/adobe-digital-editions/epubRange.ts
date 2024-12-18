import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { EpubRangeLimitsNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangeLimitsNotInTheSameFileError';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
import { EpubRangesNotInTheSameFileError } from '@obsinflate/core/adobe-digital-editions/epubRangesNotInTheSameFileError';
import { InvalidEpubRangeLimitsError } from '@obsinflate/core/adobe-digital-editions/invalidEpubRangeLimitsError';
import { Annotation } from '@obsinflate/core/adobe-digital-editions/annotations';

export class EpubRange {
    constructor(public annotation: Annotation) {
        if (this.start.filePath !== this.end.filePath) {
            throw new EpubRangeLimitsNotInTheSameFileError();
        }
        if (this.start.isPositionned(this.end) === EpubPointPosition.After) {
            throw new InvalidEpubRangeLimitsError();
        }
    }

    public get start(): EpubPoint {
        return this.annotation.target.fragment.start;
    }

    public get end(): EpubPoint {
        return this.annotation.target.fragment.end;
    }

    isPositionned(other: EpubRange): EpubRangePosition {
        if (
            this.start.isPositionned(other.start) ===
            EpubPointPosition.InAnotherFile
        ) {
            throw new EpubRangesNotInTheSameFileError();
        }
        const endToStartPosition = this.end.isPositionned(other.start);
        if (
            (endToStartPosition & EpubPointPosition.Before) ===
            EpubPointPosition.Before
        ) {
            if (
                (endToStartPosition & EpubPointPosition.Stick) ===
                EpubPointPosition.Stick
            ) {
                return EpubRangePosition.Before | EpubRangePosition.Stick;
            }
            return EpubRangePosition.Before;
        }
        if (this.start.isPositionned(other.end) === EpubPointPosition.After) {
            return EpubRangePosition.After;
        }
        return EpubRangePosition.Overlap;
    }

    tryMerge(other: EpubRange): boolean {
        const position = this.isPositionned(other);
        if (
            position !== EpubRangePosition.Overlap &&
            (position & EpubRangePosition.Stick) !== EpubRangePosition.Stick
        ) {
            return false;
        }
        this.mergeAnnotations(other.annotation, this.annotation);
        return true;
    }

    private mergeAnnotations(other: Annotation, into: Annotation): void {
        into.target.fragment.end = other.target.fragment.end;
        into.target.fragment.text = `${into.target.fragment.text} ${other.target.fragment.text}`;
        if (!other.content) {
            return;
        } else if (!into.content) {
            into.content = { text: other.content.text };
        } else {
            into.content.text = `${into.content.text} ${other.content.text}`;
        }
    }
}
