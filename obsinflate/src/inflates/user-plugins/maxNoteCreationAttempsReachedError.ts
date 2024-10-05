import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';

export class MaxNoteCreationAttempsReachedError extends AbstractBusinessError {
    constructor(attemps: number) {
        super(`Could not create a new unique note after ${attemps} attempts`);
    }
}
