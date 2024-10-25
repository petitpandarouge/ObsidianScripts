import { BadEpubFilePathFormatError } from '@obsinflate/core/adobe-digital-editions/badEpubFilePathFormatError';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export const EPUB_FILE_PATH_PREFIX = 'OEBPS/';

export class EpubPoint {
    constructor(
        public filePath: string,
        public pathComponents: number[],
        public offset: number
    ) {}
    static FromString(point: string): EpubPoint {
        const regex = /^([^#]+)#point\(((?:\/\d+)+):(\d+)\)$/;
        const match = point.match(regex);

        const filePath = match![1];
        if (!filePath.startsWith(EPUB_FILE_PATH_PREFIX)) {
            throw BadEpubFilePathFormatError.DoesNotBeginByOEBPS();
        }
        if (!filePath.endsWith(XHTML_FILE_EXTENSION)) {
            throw BadEpubFilePathFormatError.DoesNotEndByXHTML();
        }
        const pathComponents = match![2].split('/').slice(1).map(Number);
        const offset = Number(match![3]);
        return new EpubPoint(filePath, pathComponents, offset);
    }
}
