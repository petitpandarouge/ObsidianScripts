import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';

export class NoFileSelectedError extends AbstractBusinessError {
    constructor() {
        super(`No file selected. Aborting pipeline.`);
    }
}
