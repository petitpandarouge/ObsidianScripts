import { DateTimeProvider } from '@obsinflate/infrastructure/dateTimeProvider';
import { UniqueNameGenerator } from '@obsinflate/core/uniqueNameGenerator';
import { mock } from 'jest-mock-extended';
import Chance from 'chance';

describe('UniqueNameGenerator', () => {
    it('should generate each seed based on the DateTimeProvider.now() value', async () => {
        // Arrange
        const chance = new Chance();
        const seedsCount = chance.integer({ min: 1, max: 30 });
        const mockDateTimeProvider = mock<DateTimeProvider>({
            now: jest.fn()
        });
        const generator = new UniqueNameGenerator(mockDateTimeProvider);
        // Act
        for (let i = 0; i < seedsCount; i++) {
            generator.generateNewSeed();
        }
        // Assert
        expect(mockDateTimeProvider.now).toHaveBeenCalledTimes(seedsCount);
    });
});
