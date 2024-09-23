import { Checkbox } from "@obsinflate/quick-add/checkbox";
import { Dropdown } from "@obsinflate/quick-add/dropdown";
import { Format } from "@obsinflate/quick-add/format";
import { TextField } from "@obsinflate/quick-add/textField";

export type Settings = {[key: string]: string | boolean};

export interface SettingsDefinition {
    name: string;
    author: string;
    options: {[key: string]: TextField | Checkbox | Dropdown | Format};
}