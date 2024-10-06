import { DuplicatedIdError } from '@obsinflate/core/duplicatedIdError';
import { Identifiable } from '@obsinflate/core/identifiable';

export class IdValidator<TId> {
    private ids = new Set<TId>();
    validate(identifiable: Identifiable<TId>): void {
        if (this.ids.has(identifiable.id)) {
            throw new DuplicatedIdError(identifiable.id);
        }
        this.ids.add(identifiable.id);
    }
}
