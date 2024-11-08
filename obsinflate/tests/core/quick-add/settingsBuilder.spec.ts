import { CHECKBOX_TYPE } from '@obsinflate/api/quick-add/settings/checkbox';
import { DROPDOWN_TYPE } from '@obsinflate/api/quick-add/settings/dropdown';
import { FORMAT_TYPE } from '@obsinflate/api/quick-add/settings/format';
import { SettingsDefinition } from '@obsinflate/api/quick-add/settings/settings';
import { TEXT_FIELD_TYPE } from '@obsinflate/api/quick-add/settings/textField';
import { EmptyNamePropertyError } from '@obsinflate/core/quick-add/emptyNamePropertyError';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import Chance from 'chance';

const NOT_NEEDED_FOR_TEST = '';
const EMPTY_NAME_PROPERTY = '';

describe('SettingsBuilder', () => {
    it('should fill the concrete settings properties with the fields values by matching the labels', async () => {
        // Arrange
        const chance = new Chance();
        const textLabel = chance.sentence();
        const textValue = chance.sentence();
        const textName = chance.word();
        const checkboxLabel = chance.sentence();
        const checkboxValue = chance.bool();
        const checkboxName = chance.word();
        const dropdownLabel = chance.sentence();
        const dropdownValue = chance.sentence();
        const dropdownName = chance.word();
        const formatLabel = chance.sentence();
        const formatValue = chance.sentence();
        const formatName = chance.word();
        const fields = {
            [`${textLabel}`]: textValue,
            [`${checkboxLabel}`]: checkboxValue,
            [`${dropdownLabel}`]: dropdownValue,
            [`${formatLabel}`]: formatValue
        };
        const definition: SettingsDefinition = {
            name: NOT_NEEDED_FOR_TEST,
            author: NOT_NEEDED_FOR_TEST,
            options: {
                [`${textLabel}`]: {
                    name: textName,
                    type: TEXT_FIELD_TYPE
                },
                [`${checkboxLabel}`]: {
                    name: checkboxName,
                    type: CHECKBOX_TYPE
                },
                [`${dropdownLabel}`]: {
                    name: dropdownName,
                    type: DROPDOWN_TYPE
                },
                [`${formatLabel}`]: {
                    name: formatName,
                    type: FORMAT_TYPE
                }
            }
        };
        const builder = new SettingsBuilder();
        // Act
        const settings = builder.build(fields, definition);
        // Assert
        expect(settings).toEqual({
            [`${textName}`]: textValue,
            [`${checkboxName}`]: checkboxValue,
            [`${dropdownName}`]: dropdownValue,
            [`${formatName}`]: formatValue
        });
    });
    it('', async () => {
        // Arrange
        const chance = new Chance();
        const label = chance.sentence();
        const value = chance.sentence();
        const fields = {
            [`${label}`]: value
        };
        const definition: SettingsDefinition = {
            name: NOT_NEEDED_FOR_TEST,
            author: NOT_NEEDED_FOR_TEST,
            options: {
                [`${label}`]: {
                    name: EMPTY_NAME_PROPERTY,
                    type: TEXT_FIELD_TYPE
                }
            }
        };
        const builder = new SettingsBuilder();
        // Act
        const action = () => builder.build(fields, definition);
        // Assert
        expect(action).toThrow(EmptyNamePropertyError);
    });
});
