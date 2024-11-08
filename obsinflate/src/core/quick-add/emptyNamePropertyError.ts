export class EmptyNamePropertyError extends Error {
    constructor(fieldLabel: string) {
        super(
            `Name property must not be empty for the field with label '${fieldLabel}'`
        );
    }
}
