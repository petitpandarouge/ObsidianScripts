import { EPUB_POINT_FILE_PATH_PREFIX } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export class BadEpubPointFormatError extends Error {
    constructor() {
        super(
            `An EPUB point must be in the format "${EPUB_POINT_FILE_PATH_PREFIX}path/to/file${XHTML_FILE_EXTENSION}#point(/1/2/3:4)"`
        );
    }
}
