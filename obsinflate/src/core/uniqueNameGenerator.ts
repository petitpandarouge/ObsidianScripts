import { UniqueNameGeneratorSeed } from '@obsinflate/core/uniqueNameGeneratorSeed';
import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';

export class UniqueNameGenerator {
    constructor(private dateTimeProvider: DateTimeProvider) {}

    generateNewSeed() {
        return new UniqueNameGeneratorSeed(this.dateTimeProvider.now());
    }
}
