export type DropdownType = "dropdown";

export interface Dropdown {
    type: DropdownType;
    options: string[];
    defaultValue: string;
}