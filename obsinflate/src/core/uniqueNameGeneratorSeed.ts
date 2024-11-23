import { DateTime } from '@obsinflate/infrastructure/dateTimeProvider';

export const UNIQUE_NAME_DATETIME_FORMAT = 'yyyyMMddHHmm';
export const ONE_MINUTE = { minutes: 1 };

export class UniqueNameGeneratorSeed {
    constructor(private dateTime: DateTime) {}

    next() {
        const result = this.dateTime.toFormat(UNIQUE_NAME_DATETIME_FORMAT);
        this.dateTime = this.dateTime.plus(ONE_MINUTE);
        return result;
    }
}
