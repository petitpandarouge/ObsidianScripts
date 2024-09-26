import { Identifiable } from '@obsinflate/identifiable';

export class IdValidator<TId> {
    private ids = new Set<TId>();
    validate(
        identifiable: Identifiable<TId>,
        errorMessage: (id: TId) => string
    ): void {
        if (this.ids.has(identifiable.id)) {
            // TODO change it to a proper obsinflate error
            throw new Error(errorMessage(identifiable.id));
        }
        this.ids.add(identifiable.id);
    }
}
