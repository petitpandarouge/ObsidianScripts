import {
    DateTimeService,
    IDateTimeService
} from '@obsinflate/infrastructure/dateTimeService';
import {
    UNIQUE_NAME_DATETIME_FORMAT,
    UniqueNameGenerator
} from '@obsinflate/uniqueNameGenerator';
import { mock } from 'jest-mock-extended';
import { DateTime } from 'luxon';
import Chance from 'chance';

describe('UniqueNameGenerator', () => {
    it('should generate a twelve numbers formated name', async () => {
        // Arrange
        const dateTimeService = new DateTimeService();
        const generator = new UniqueNameGenerator(dateTimeService);
        // Act
        const name = generator.generateFromNow();
        // Assert
        expect(name).toMatch(/^\d{12}$/);
    });
    it('should generate a "YYYYMMDDHHmm" formated name', async () => {
        // Arrange
        const chance = new Chance();
        const mockDateTimeObject = {
            year: chance.integer({ min: 1000, max: 9999 }),
            month: chance.integer({ min: 1, max: 12 }),
            day: chance.integer({ min: 1, max: 27 }),
            hour: chance.integer({ min: 0, max: 23 }),
            minute: chance.integer({ min: 0, max: 59 })
        };
        const mockDateTimeResult = `${mockDateTimeObject.year.toString().padStart(4, '0')}${mockDateTimeObject.month.toString().padStart(2, '0')}${mockDateTimeObject.day.toString().padStart(2, '0')}${mockDateTimeObject.hour.toString().padStart(2, '0')}${mockDateTimeObject.minute.toString().padStart(2, '0')}`;
        const mockDateService = mock<IDateTimeService>({
            now: jest.fn().mockImplementation(() => {
                return DateTime.fromObject(mockDateTimeObject);
            })
        });
        const generator = new UniqueNameGenerator(mockDateService);
        // Act
        const name = generator.generateFromNow();
        // Assert
        expect(name).toMatch(mockDateTimeResult);
    });
    it('should generate a "YYYYMMDDHH(mm+1)" formated name for each new call to generateFromNow with the same generator instance', async () => {
        // Arrange
        const chance = new Chance();
        const mockDateTimeObject = {
            year: chance.integer({ min: 1000, max: 9999 }),
            month: chance.integer({ min: 1, max: 12 }),
            day: chance.integer({ min: 1, max: 27 }),
            hour: chance.integer({ min: 0, max: 23 }),
            minute: chance.integer({ min: 0, max: 59 })
        };
        const mockDateTime = DateTime.fromObject(mockDateTimeObject);
        const mockDateService = mock<IDateTimeService>({
            now: jest.fn().mockImplementation(() => {
                return DateTime.fromObject(mockDateTimeObject);
            })
        });
        const generator = new UniqueNameGenerator(mockDateService);
        const generateCount = chance.integer({ min: 1, max: 30 });
        // Act
        const names = Array.from({ length: generateCount }, () =>
            generator.generateFromNow()
        );
        // Assert
        names.forEach((name, index) => {
            const expectedDateTime = mockDateTime.plus({ minutes: index });
            const expectedName = expectedDateTime.toFormat(
                UNIQUE_NAME_DATETIME_FORMAT
            );
            expect(name).toBe(expectedName);
        });
    });
});
