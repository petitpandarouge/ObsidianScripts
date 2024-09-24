import { DateTime } from 'luxon';

export class DateService {
    now(): DateTime {
        return DateTime.now();
    }
}
