import { CHECKBOX_TYPE } from '@obsinflate/api/quick-add/settings/checkbox';
import { DROPDOWN_TYPE } from '@obsinflate/api/quick-add/settings/dropdown';
import { FORMAT_TYPE } from '@obsinflate/api/quick-add/settings/format';
import { TEXT_FIELD_TYPE } from '@obsinflate/api/quick-add/settings/textField';
import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import Chance from 'chance';

describe('SettingsDefinitionBuilder', () => {
    it('should build a setting definition with the given script name', async () => {
        // Arrange
        const chance = new Chance();
        const stubScriptName = chance.string();
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition.forScript(stubScriptName).build();
        // Assert
        expect(result.name).toEqual(stubScriptName);
    });
    it('should build a setting definition with the given author', async () => {
        // Arrange
        const chance = new Chance();
        const stubAuthor = chance.string();
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition.implementedBy(stubAuthor).build();
        // Assert
        expect(result.author).toEqual(stubAuthor);
    });
    it('should build a setting definition with the given TextField option', async () => {
        // Arrange
        const chance = new Chance();
        const stubTextFieldDefinition = {
            name: chance.string(),
            label: chance.string(),
            defaultValue: chance.string(),
            placeholder: chance.string(),
            description: chance.string()
        };
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition
            .havingTextFieldOption(stubTextFieldDefinition)
            .build();
        // Assert
        expect(result.options).toEqual({
            [stubTextFieldDefinition.label]: {
                type: TEXT_FIELD_TYPE,
                name: stubTextFieldDefinition.name,
                defaultValue: stubTextFieldDefinition.defaultValue,
                placeholder: stubTextFieldDefinition.placeholder,
                description: stubTextFieldDefinition.description
            }
        });
    });
    it('should build a setting definition with the given Checkbox options', async () => {
        // Arrange
        const chance = new Chance();
        const stubCheckboxDefinition = {
            name: chance.string(),
            label: chance.string(),
            defaultValue: chance.bool()
        };
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition
            .havingCheckboxOption(stubCheckboxDefinition)
            .build();
        // Assert
        expect(result.options).toEqual({
            [stubCheckboxDefinition.label]: {
                type: CHECKBOX_TYPE,
                name: stubCheckboxDefinition.name,
                defaultValue: stubCheckboxDefinition.defaultValue
            }
        });
    });
    it('should build a setting definition with the given Dropdown options', async () => {
        // Arrange
        const chance = new Chance();
        const stubDropdownDefinition = {
            name: chance.string(),
            label: chance.string(),
            options: chance.n(
                chance.string,
                chance.integer({ min: 1, max: 10 })
            ),
            defaultValue: chance.string()
        };
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition
            .havingDropdownOption(stubDropdownDefinition)
            .build();
        // Assert
        expect(result.options).toEqual({
            [stubDropdownDefinition.label]: {
                type: DROPDOWN_TYPE,
                name: stubDropdownDefinition.name,
                options: stubDropdownDefinition.options,
                defaultValue: stubDropdownDefinition.defaultValue
            }
        });
    });
    it('should build a setting definition with the given Format options', async () => {
        // Arrange
        const chance = new Chance();
        const stubFormatDefinition = {
            name: chance.string(),
            label: chance.string(),
            defaultValue: chance.string(),
            placeholder: chance.string()
        };
        const settingsDefinition = new SettingsDefinitionBuilder();
        // Act
        const result = settingsDefinition
            .havingFormatOption(stubFormatDefinition)
            .build();
        // Assert
        expect(result.options).toEqual({
            [stubFormatDefinition.label]: {
                type: FORMAT_TYPE,
                name: stubFormatDefinition.name,
                defaultValue: stubFormatDefinition.defaultValue,
                placeholder: stubFormatDefinition.placeholder
            }
        });
    });
});
