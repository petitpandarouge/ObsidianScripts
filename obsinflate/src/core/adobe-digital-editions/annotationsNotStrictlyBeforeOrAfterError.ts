export class AnnotationsNotStrictlyBeforeOrAfterError extends Error {
    constructor() {
        super('Annotations are not strictly before or after each other');
    }
}
