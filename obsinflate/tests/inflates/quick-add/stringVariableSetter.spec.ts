import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { mock, mockDeep } from 'jest-mock-extended';
import Chance from 'chance';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { StringVariableSetter } from '@obsinflate/inflates/quick-add/string-variable-setter/script';

describe('StringVariableSetter', () => {
    it('should set a "Settings.value" into a "Settings.variableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const stubSettings = {
            variableName: chance.word(),
            value: chance.word()
        };
        const script = new StringVariableSetter(errorNoticer, stubSettings);
        const mockParams = mockDeep<Parameters>();
        // Act
        await script.entry(mockParams);
        // Assert
        expect(mockParams.variables[stubSettings.variableName]).toBe(
            stubSettings.value
        );
    });
});
