import { BadEpubPointFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFilePathFormatError';
import { BadEpubPointFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubPointFormatError';
import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export const EPUB_POINT_FILE_PATH_PREFIX = 'OEBPS/';
export const EPUB_POINT_COMPONENTS_SEPARATOR = '/';

export class EpubPoint {
    constructor(
        public filePath: string,
        public pathComponents: number[],
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
        const pathComponents = match[2]
            .split(EPUB_POINT_COMPONENTS_SEPARATOR)
            .slice(1)
            .map(Number);
        const offset = Number(match[3]);
        return new EpubPoint(filePath, pathComponents, offset);
    }

    isPositionned(other: EpubPoint): EpubPointPosition {
        if (this.filePath !== other.filePath) {
            return EpubPointPosition.InAnotherFile;
        }
        throw new Error('Not implemented');
    }
}
