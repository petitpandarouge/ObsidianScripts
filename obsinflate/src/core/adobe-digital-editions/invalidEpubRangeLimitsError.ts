export class InvalidEpubRangeLimitsError extends Error {
    constructor() {
        super('The start point is after the end point.');
    }
}
