import { DuplicatedIdError } from '@obsinflate/core/duplicatedIdError';
import { Identifiable } from '@obsinflate/core/identifiable';
import { IdValidator } from '@obsinflate/core/idValidator';
import Chance from 'chance';

describe('IdValidator', () => {
    it('should not raise an error if all the identifiers provided in an IdValidator instance are differents', async () => {
        // Arrange
        const chance = new Chance();
        const idValidator = new IdValidator<string>();
        const identifiablesCount = chance.integer({ min: 1, max: 30 });
        const mockIdentifiables: Identifiable<string>[] = [];
        for (let i = 0; i < identifiablesCount; i++) {
            mockIdentifiables.push({ id: chance.guid() });
        }
        // Act
        const action = () => {
            for (const identifiable of mockIdentifiables) {
                idValidator.validate(identifiable);
            }
        };
        // Assert
        expect(action).not.toThrow();
    });
    it('should raise a DuplicatedIdError if two identifiers provided in an IdValidator instance are the same', async () => {
        // Arrange
        const chance = new Chance();
        const idValidator = new IdValidator<string>();
        const identifiable = { id: chance.guid() };
        // Act
        idValidator.validate(identifiable);
        const action = () => idValidator.validate(identifiable);
        // Assert
        expect(action).toThrow(DuplicatedIdError);
    });
});
