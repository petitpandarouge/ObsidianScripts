import {
    FileNameSanitizer,
    NOTE_TITLE_FORBIDDEN_CARACTERS
} from '@obsinflate/core/fileNameSanitizer';
import Chance from 'chance';

describe('FileNameSanitizer', () => {
    it('should replace all forbidden characters with the replacement character', () => {
        // Arrange
        const chance = new Chance();
        const fileNameSanitizer = new FileNameSanitizer();
        const fileName =
            chance.sentence() +
            chance.pickone(NOTE_TITLE_FORBIDDEN_CARACTERS) +
            chance.sentence();
        // Act
        const sanitizedFileName = fileNameSanitizer.sanitize(fileName);
        // Assert
        for (const forbiddenCaracter of NOTE_TITLE_FORBIDDEN_CARACTERS) {
            expect(sanitizedFileName).not.toContain(forbiddenCaracter);
        }
    });
});
