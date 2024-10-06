import { IDateTime } from '@obsinflate/infrastructure/dateTimeProvider';

export const UNIQUE_NAME_DATETIME_FORMAT = 'yyyyMMddHHmm';
export const ONE_MINUTE = { minutes: 1 };

export interface IUniqueNameGeneratorSeed {
    next: () => string;
}

export class UniqueNameGeneratorSeed implements IUniqueNameGeneratorSeed {
    constructor(private dateTime: IDateTime) {}

    next() {
        const result = this.dateTime.toFormat(UNIQUE_NAME_DATETIME_FORMAT);
        this.dateTime = this.dateTime.plus(ONE_MINUTE);
        return result;
    }
}
