import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';

export class StubBusinessError extends AbstractBusinessError {
    constructor(message?: string) {
        super(message);
    }
}
