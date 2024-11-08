export const DROPDOWN_TYPE = 'dropdown';
export type DropdownType = 'dropdown';

export interface DropdownBase {
    options: string[];
    defaultValue: string;
}

export interface Dropdown extends Partial<DropdownBase> {
    type: DropdownType;
    name: string;
}
