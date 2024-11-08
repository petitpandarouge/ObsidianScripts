export const FORMAT_TYPE = 'format';
export type FormatType = 'format';

export interface FormatBase {
    defaultValue: string;
    placeholder: string;
}

export interface Format extends Partial<FormatBase> {
    type: FormatType;
    name: string;
}
