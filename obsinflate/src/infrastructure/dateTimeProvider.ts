import { DateTime, DurationLike, LocaleOptions } from 'luxon';

export interface IDateTime {
    toFormat(fmt: string, opts?: LocaleOptions): string;
    plus(duration: DurationLike): this;
}

export interface IDateTimeProvider {
    now(): IDateTime;
}

export class DateTimeProvider implements IDateTimeProvider {
    now(): DateTime {
        return DateTime.now();
    }
}
