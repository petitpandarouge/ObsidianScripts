export class NoActiveFileFoundError extends Error {
    constructor() {
        super('No active file in the workspace');
    }
}
