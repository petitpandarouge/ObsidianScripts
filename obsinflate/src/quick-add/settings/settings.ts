import { Checkbox } from '@obsinflate/quick-add/settings/checkbox';
import { Dropdown } from '@obsinflate/quick-add/settings/dropdown';
import { Format } from '@obsinflate/quick-add/settings/format';
import { TextField } from '@obsinflate/quick-add/settings/textField';

export type Settings = { [key: string]: string | boolean };

export interface SettingsDefinition {
    name: string;
    author: string;
    options: { [key: string]: TextField | Checkbox | Dropdown | Format };
}
