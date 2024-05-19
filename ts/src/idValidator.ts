import { Identifiable } from "@obsidian/identifiable";

export class IdValidator<TId> {
    private ids = new Set<TId>();
    validate(identifiable: Identifiable<TId>): void {
        if (this.ids.has(identifiable.id)) {
            throw new Error(`Duplicate id: ${identifiable.id}`);
        }
        this.ids.add(identifiable.id);
    }
}
