import { DateTime, DurationLike, LocaleOptions } from 'luxon';

export interface IDateTime {
    toFormat(fmt: string, opts?: LocaleOptions): string;
    plus(duration: DurationLike): this;
}

export interface IDateTimeService {
    now(): IDateTime;
}

export class DateTimeService implements IDateTimeService {
    now(): DateTime {
        return DateTime.now();
    }
}
