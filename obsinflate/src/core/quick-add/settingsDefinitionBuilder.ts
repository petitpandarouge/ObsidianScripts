import {
    CHECKBOX_TYPE,
    CheckboxBase
} from '@obsinflate/api/quick-add/settings/checkbox';
import {
    DROPDOWN_TYPE,
    DropdownBase
} from '@obsinflate/api/quick-add/settings/dropdown';
import {
    FORMAT_TYPE,
    FormatBase
} from '@obsinflate/api/quick-add/settings/format';
import { SettingsDefinition } from '@obsinflate/api/quick-add/settings/settings';
import {
    TEXT_FIELD_TYPE,
    TextFieldBase
} from '@obsinflate/api/quick-add/settings/textField';

const NO_NAME = '';
const NO_AUTHOR = '';

interface NamedOption {
    name: string;
    label: string;
}

type TextFieldDefinition = NamedOption & Partial<TextFieldBase>;
type FormatDefinition = NamedOption & Partial<FormatBase>;
type CheckboxDefinition = NamedOption & CheckboxBase;
type DropdownDefinition = NamedOption & DropdownBase;

export class SettingsDefinitionBuilder {
    private definition: SettingsDefinition = {
        name: NO_NAME,
        author: NO_AUTHOR,
        options: {}
    };

    forScript(name: string): SettingsDefinitionBuilder {
        this.definition.name = name;
        return this;
    }

    implementedBy(author: string): SettingsDefinitionBuilder {
        this.definition.author = author;
        return this;
    }

    havingTextFieldOption(
        textFieldDefinition: TextFieldDefinition
    ): SettingsDefinitionBuilder {
        this.definition.options[textFieldDefinition.label] = {
            type: TEXT_FIELD_TYPE,
            name: textFieldDefinition.name,
            defaultValue: textFieldDefinition.defaultValue,
            placeholder: textFieldDefinition.placeholder,
            description: textFieldDefinition.description
        };
        return this;
    }

    havingCheckboxOption(
        checkboxDefinition: CheckboxDefinition
    ): SettingsDefinitionBuilder {
        this.definition.options[checkboxDefinition.label] = {
            type: CHECKBOX_TYPE,
            name: checkboxDefinition.name,
            defaultValue: checkboxDefinition.defaultValue
        };
        return this;
    }

    havingDropdownOption(
        dropdownDefinition: DropdownDefinition
    ): SettingsDefinitionBuilder {
        this.definition.options[dropdownDefinition.label] = {
            type: DROPDOWN_TYPE,
            name: dropdownDefinition.name,
            options: dropdownDefinition.options,
            defaultValue: dropdownDefinition.defaultValue
        };
        return this;
    }

    havingFormatOption(
        formatDefinition: FormatDefinition
    ): SettingsDefinitionBuilder {
        this.definition.options[formatDefinition.label] = {
            type: FORMAT_TYPE,
            name: formatDefinition.name,
            defaultValue: formatDefinition.defaultValue,
            placeholder: formatDefinition.placeholder
        };
        return this;
    }

    build(): SettingsDefinition {
        return this.definition;
    }
}
