import { AbstractBusinessError } from '@obsinflate/abstractBusinessError';

export class TestBusinessError extends AbstractBusinessError {
    constructor(message?: string) {
        super(message);
    }
}
