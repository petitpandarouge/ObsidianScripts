import {
    IDateTime,
    IDateTimeService
} from '@obsinflate/infrastructure/dateTimeService';
export const UNIQUE_NAME_DATETIME_FORMAT = 'yyyyMMddHHmm';

export interface IUniqueNameGenerator {
    generateFromNow(): string;
}

export class UniqueNameGenerator implements IUniqueNameGenerator {
    #dateTimeToken?: IDateTime;
    constructor(private dateTimeService: IDateTimeService) {}

    generateFromNow(): string {
        if (this.#dateTimeToken) {
            this.#dateTimeToken = this.#dateTimeToken.plus({ minutes: 1 });
        } else {
            this.#dateTimeToken = this.dateTimeService.now();
        }
        return this.#dateTimeToken.toFormat(UNIQUE_NAME_DATETIME_FORMAT);
    }
}
