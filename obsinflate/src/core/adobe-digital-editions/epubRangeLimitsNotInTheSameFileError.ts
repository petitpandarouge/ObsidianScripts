export class EpubRangeLimitsNotInTheSameFileError extends Error {
    constructor() {
        super('The range limits are not in the same file.');
    }
}
