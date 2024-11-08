export const TEXT_FIELD_TYPE = 'text';
export type TextFieldType = 'text';

export interface TextFieldBase {
    defaultValue: string;
    placeholder: string;
    description: string;
}

export interface TextField extends Partial<TextFieldBase> {
    type: TextFieldType;
    name: string;
}
