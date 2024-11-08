export class FileDoesNotExistError extends Error {
    constructor(filePath: string) {
        super(`The file "${filePath}" does not exist.`);
    }
}
