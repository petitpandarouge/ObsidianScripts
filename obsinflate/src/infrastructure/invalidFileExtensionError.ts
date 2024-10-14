export class InvalidFileExtensionError extends Error {
    constructor(filePath: string, expectedExtension: string) {
        super(
            `The extension for file "${filePath}" is invalid. The expected extension is "${expectedExtension}".`
        );
    }
}
