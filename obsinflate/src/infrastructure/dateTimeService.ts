import { DateTime } from 'luxon';

export interface IDateTimeService {
    now(): DateTime;
}

export class DateTimeService implements IDateTimeService {
    now(): DateTime {
        return DateTime.now();
    }
}
