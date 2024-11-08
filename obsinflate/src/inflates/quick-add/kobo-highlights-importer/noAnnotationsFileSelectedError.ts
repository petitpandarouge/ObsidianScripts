import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';

export class NoAnnotationsFileSelectedError extends AbstractBusinessError {
    constructor() {
        super(`No annotations file selected. Aborting import.`);
    }
}
