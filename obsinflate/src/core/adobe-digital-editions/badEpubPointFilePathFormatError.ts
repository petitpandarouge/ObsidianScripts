import { EPUB_POINT_FILE_PATH_PREFIX } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export class BadEpubPointFilePathFormatError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static DoesNotBeginByOEBPS(): BadEpubPointFilePathFormatError {
        return new BadEpubPointFilePathFormatError(
            `The file path of an EpubPoint must begin by ${EPUB_POINT_FILE_PATH_PREFIX}`
        );
    }

    static DoesNotEndByXHTML(): BadEpubPointFilePathFormatError {
        return new BadEpubPointFilePathFormatError(
            `The file path of an EpubPoint must end by ${XHTML_FILE_EXTENSION}`
        );
    }
}
