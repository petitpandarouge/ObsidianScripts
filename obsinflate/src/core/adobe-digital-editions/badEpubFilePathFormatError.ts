import { EPUB_FILE_PATH_PREFIX } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { XHTML_FILE_EXTENSION } from '@obsinflate/core/fileExtensions';

export class BadEpubFilePathFormatError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static DoesNotBeginByOEBPS(): BadEpubFilePathFormatError {
        return new BadEpubFilePathFormatError(
            `The file path of an EpubPoint must begin by ${EPUB_FILE_PATH_PREFIX}`
        );
    }

    static DoesNotEndByXHTML(): BadEpubFilePathFormatError {
        return new BadEpubFilePathFormatError(
            `The file path of an EpubPoint must end by ${XHTML_FILE_EXTENSION}`
        );
    }
}
