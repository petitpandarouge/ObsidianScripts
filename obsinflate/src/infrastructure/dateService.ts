/* eslint-disable @typescript-eslint/no-explicit-any */
import { Date } from '@obsinflate/infrastructure/date';

declare const moment: any;

export class DateService {
    now(): Date {
        return moment();
    }
}