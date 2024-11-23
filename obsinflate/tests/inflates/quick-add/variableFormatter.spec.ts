import { mock, mockDeep } from 'jest-mock-extended';
import Chance from 'chance';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { VariableNotDefinedError } from '@obsinflate/api/quick-add/variableNotDefinedError';
import { VariablesFormatter } from '@obsinflate/inflates/quick-add/variable-formatter/script';
import { VariableFormatterSettings } from '@obsinflate/inflates/quick-add/variable-formatter/settings';
import { EmptyFormatError } from '@obsinflate/inflates/quick-add/variable-formatter/emptyFormatError';

const EMPTY_FORMAT = '';

describe('VariablesFormatter', () => {
    it('should raise an EmptyFormatError if "Settings.format" is empty', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: VariableFormatterSettings = {
            valueVariableName: chance.word(),
            format: EMPTY_FORMAT,
            formattedValueVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.valueVariableName]: chance.word()
            }
        });
        const mapper = new VariablesFormatter(errorNoticer, mockSettings);
        // Act
        const action = async () => await mapper.entry(mockParams);
        // Assert
        expect(action).rejects.toThrow(EmptyFormatError);
    });
    it('should raise a VariableNotDefinedError is the input variable is not set', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: VariableFormatterSettings = {
            valueVariableName: chance.word(),
            format: EMPTY_FORMAT,
            formattedValueVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>();
        const mapper = new VariablesFormatter(errorNoticer, mockSettings);
        // Act
        const action = async () => await mapper.entry(mockParams);
        // Assert
        await expect(action).rejects.toThrow(VariableNotDefinedError);
    });
    it('should format the "Settings.valueVariableName" value into the "Settings.formattedValueVariableName" variable using the "Settings.format" if it is set', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<Noticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const mockSettings: VariableFormatterSettings = {
            valueVariableName: chance.word(),
            format: `${chance.word()} {{value}} ${chance.word()}`,
            formattedValueVariableName: chance.word()
        };
        const mockParams = mockDeep<Parameters>({
            variables: {
                [mockSettings.valueVariableName]: chance.word()
            }
        });
        const mapper = new VariablesFormatter(errorNoticer, mockSettings);
        // Act
        await mapper.entry(mockParams);
        // Assert
        expect(
            mockParams.variables[mockSettings.formattedValueVariableName]
        ).toBe(
            `${mockSettings.format!.replace('{{value}}', mockParams.variables[mockSettings.valueVariableName] as string)}`
        );
    });
});
