export class VariableNotDefinedError extends Error {
    constructor(variableName: string) {
        super(`Variable "${variableName}" is not defined.`);
    }
}
