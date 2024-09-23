import { Date } from '@obsinflate/infrastructure/date';

declare const moment: any;

export class DateService {
    now(): Date {
        return moment();
    }
}