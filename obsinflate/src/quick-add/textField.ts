export type TextFieldType = "text";

export interface TextField {
    type: TextFieldType;
    defaultValue: string;
    placeholder: string;
    description: string;
}