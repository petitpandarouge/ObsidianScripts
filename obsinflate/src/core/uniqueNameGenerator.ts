import {
    IUniqueNameGeneratorSeed,
    UniqueNameGeneratorSeed
} from '@obsinflate/core/uniqueNameGeneratorSeed';
import { IDateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';

export interface IUniqueNameGenerator {
    generateNewSeed(): IUniqueNameGeneratorSeed;
}

export class UniqueNameGenerator implements IUniqueNameGenerator {
    constructor(private dateTimeProvider: IDateTimeProvider) {}

    generateNewSeed() {
        return new UniqueNameGeneratorSeed(this.dateTimeProvider.now());
    }
}
