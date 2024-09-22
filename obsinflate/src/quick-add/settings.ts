import { Checkbox } from "@obsidian/quick-add/checkbox";
import { Dropdown } from "@obsidian/quick-add/dropdown";
import { Format } from "@obsidian/quick-add/format";
import { TextField } from "@obsidian/quick-add/textField";

export type Settings = {[key: string]: string | boolean};

export interface SettingsDefinition {
    name: string;
    author: string;
    options: {[key: string]: TextField | Checkbox | Dropdown | Format};
}