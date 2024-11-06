import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import {
    UNIQUE_NAME_DATETIME_FORMAT,
    UniqueNameGeneratorSeed
} from '@obsinflate/core/uniqueNameGeneratorSeed';
import {
    DateTimeProvider,
    IDateTime
} from '@obsinflate/infrastructure/dateTimeProvider';
import { mock } from 'jest-mock-extended';
import Chance from 'chance';
import { DateTime } from 'luxon';

describe('UniqueNameGeneratorSeed', () => {
    it('should generate a twelve numbers formated name', async () => {
        // Arrange
        const dateTimeProvider = new DateTimeProvider();
        const generator = new UniqueNameGenerator(dateTimeProvider);
        const seed = generator.generateNewSeed();
        // Act
        const name = seed.next();
        // Assert
        expect(name).toMatch(/^\d{12}$/);
    });
    it('should use DateTime.format to generate the name', async () => {
        // Arrange
        const mockDateTime = mock<IDateTime>({
            toFormat: jest.fn()
        });
        const seed = new UniqueNameGeneratorSeed(mockDateTime);
        // Act
        seed.next();
        // Assert
        expect(mockDateTime.toFormat).toHaveBeenCalledTimes(1);
        expect(mockDateTime.toFormat).toHaveBeenCalledWith(
            UNIQUE_NAME_DATETIME_FORMAT
        );
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
        const mockDateTime = DateTime.fromObject(mockDateTimeObject);
        const seed = new UniqueNameGeneratorSeed(mockDateTime);
        // Act
        const name = seed.next();
        // Assert
        expect(name).toMatch(mockDateTimeResult);
    });
    it('should generate a "YYYYMMDDHHm(m+1)" formated name for each new call to next with the same seed instance', async () => {
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
        const seed = new UniqueNameGeneratorSeed(mockDateTime);
        const nextCount = chance.integer({ min: 1, max: 30 });
        // Act
        const names = Array.from({ length: nextCount }, () => seed.next());
        // Assert
        const result = DateTime.fromObject(mockDateTimeObject);
        names.forEach((name, index) => {
            const expectedDateTime = result.plus({ minutes: index });
            const expectedName = expectedDateTime.toFormat(
                UNIQUE_NAME_DATETIME_FORMAT
            );
            expect(name).toBe(expectedName);
        });
    });
});
