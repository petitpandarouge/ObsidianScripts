export abstract class AbstractBusinessError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
