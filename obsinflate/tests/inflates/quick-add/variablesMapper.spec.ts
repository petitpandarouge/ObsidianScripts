import { mock, mockDeep } from 'jest-mock-extended';
import Chance from 'chance';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { VariableNotDefinedError } from '@obsinflate/api/quick-add/variableNotDefinedError';
import { VariablesMapper } from '@obsinflate/inflates/quick-add/variables-mapper/script';

describe('VariablesMapper', () => {
    it('should mappe the input "Settings.inputVariableName" variable into the output "Settings.outputVariableName" variable', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = {
            inputVariableName: chance.word(),
            outputVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.inputVariableName]: chance.word()
            }
        });
        const mapper = new VariablesMapper(errorNoticer, mockSettings);
        // Act
        await mapper.entry(mockParams);
        // Assert
        expect(mockParams.variables[mockSettings.outputVariableName]).toBe(
            mockParams.variables[mockSettings.inputVariableName]
        );
    });
    it('should raise a VariableNotDefinedError is the input variable is not set', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings = {
            inputVariableName: chance.word(),
            outputVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>();
        const mapper = new VariablesMapper(errorNoticer, mockSettings);
        // Act
        const action = async () => await mapper.entry(mockParams);
        // Assert
        await expect(action).rejects.toThrow(VariableNotDefinedError);
    });
});
