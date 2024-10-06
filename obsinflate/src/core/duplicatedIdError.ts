export class DuplicatedIdError<TId> extends Error {
    constructor(id: TId) {
        super(`The ${id} identifier is already used.`);
    }
}
