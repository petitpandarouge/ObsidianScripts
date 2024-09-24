import { IIdentifiable } from '@obsinflate/iIdentifiable';

export class IdValidator<TId> {
    private ids = new Set<TId>();
    validate(
        identifiable: IIdentifiable<TId>,
        errorMessage: (id: TId) => string
    ): void {
        if (this.ids.has(identifiable.id)) {
            throw new Error(errorMessage(identifiable.id));
        }
        this.ids.add(identifiable.id);
    }
}
