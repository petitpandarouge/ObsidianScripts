import {
    IDateTime,
    IDateTimeProvider
} from '@obsinflate/infrastructure/dateTimeProvider';
export const UNIQUE_NAME_DATETIME_FORMAT = 'yyyyMMddHHmm';

export interface IUniqueNameGenerator {
    generateFromNow(): string;
}

export class UniqueNameGenerator implements IUniqueNameGenerator {
    #dateTimeToken?: IDateTime;
    constructor(private dateTimeProvider: IDateTimeProvider) {}

    generateFromNow(): string {
        if (this.#dateTimeToken) {
            this.#dateTimeToken = this.#dateTimeToken.plus({ minutes: 1 });
        } else {
            this.#dateTimeToken = this.dateTimeProvider.now();
        }
        return this.#dateTimeToken.toFormat(UNIQUE_NAME_DATETIME_FORMAT);
    }
}
