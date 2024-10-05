import { Checkbox } from '@obsinflate/api/quick-add/settings/checkbox';
import { Dropdown } from '@obsinflate/api/quick-add/settings/dropdown';
import { Format } from '@obsinflate/api/quick-add/settings/format';
import { TextField } from '@obsinflate/api/quick-add/settings/textField';

export type Settings = { [key: string]: string | boolean };

export interface SettingsDefinition {
    name: string;
    author: string;
    options: { [key: string]: TextField | Checkbox | Dropdown | Format };
}
