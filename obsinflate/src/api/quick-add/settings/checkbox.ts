export const CHECKBOX_TYPE = 'checkbox';
export type CheckboxType = 'checkbox';

export interface CheckboxBase {
    defaultValue: boolean;
}

export interface Checkbox extends Partial<CheckboxBase> {
    type: CheckboxType;
    name: string;
}
