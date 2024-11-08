export class EpubRangesNotInTheSameFileError extends Error {
    constructor() {
        super('The ranges are not in the same file.');
    }
}
