import { BadEpubPointFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFilePathFormatError';
import { BadEpubPointFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFormatError';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export const EPUB_POINT_FILE_PATH_PREFIX = 'OEBPS/';
export const EPUB_POINT_COMPONENTS_SEPARATOR = '/';

export class EpubPoint {
    constructor(
        public filePath: string,
        public elementIndexes: number[],
        public offset: number
    ) {}

    static FromString(point: string): EpubPoint {
        const regex = /^([^#]+)#point\(((?:\/\d+)+):(\d+)\)$/;
        const match = point.match(regex);
        if (!match) {
            throw new BadEpubPointFormatError();
        }
        const filePath = match[1];
        if (!filePath.startsWith(EPUB_POINT_FILE_PATH_PREFIX)) {
            throw BadEpubPointFilePathFormatError.DoesNotBeginByOEBPS();
        }
        if (!filePath.endsWith(XHTML_FILE_EXTENSION)) {
            throw BadEpubPointFilePathFormatError.DoesNotEndByXHTML();
        }
        const elementIndexes = match[2]
            .split(EPUB_POINT_COMPONENTS_SEPARATOR)
            .slice(1)
            .map(Number);
        const offset = Number(match[3]);
        return new EpubPoint(filePath, elementIndexes, offset);
    }

    isPositionned(other: EpubPoint): EpubPointPosition {
        if (this.filePath !== other.filePath) {
            return EpubPointPosition.InAnotherFile;
        }
        for (
            let i = 0;
            i <
            Math.min(this.elementIndexes.length, other.elementIndexes.length);
            i++
        ) {
            if (this.elementIndexes[i] < other.elementIndexes[i]) {
                return EpubPointPosition.Before;
            } else if (this.elementIndexes[i] > other.elementIndexes[i]) {
                return EpubPointPosition.After;
            }
        }
        if (this.elementIndexes.length < other.elementIndexes.length) {
            return EpubPointPosition.Before;
        } else if (this.elementIndexes.length > other.elementIndexes.length) {
            return EpubPointPosition.After;
        }
        if (this.offset + 1 === other.offset) {
            return EpubPointPosition.Stick;
        } else if (this.offset < other.offset) {
            return EpubPointPosition.Before;
        } else if (this.offset > other.offset) {
            return EpubPointPosition.After;
        }
        return EpubPointPosition.Same;
    }
}
