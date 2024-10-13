import { ValidationError } from 'fast-xml-parser';

export class InvalidXmlError extends Error {
    constructor(error: ValidationError) {
        super(
            `Invalid XML at (${error.err.line}:${error.err.col}) - [${error.err.code}] ${error.err.msg}`
        );
    }
}
