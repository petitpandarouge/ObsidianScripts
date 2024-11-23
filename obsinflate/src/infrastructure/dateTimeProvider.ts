import { DateTime as LuxonDateTime, DurationLike, LocaleOptions } from 'luxon';

export interface DateTime {
    toFormat(fmt: string, opts?: LocaleOptions): string;
    plus(duration: DurationLike): this;
}

export class DateTimeProvider {
    now(): DateTime {
        return LuxonDateTime.now();
    }
}
