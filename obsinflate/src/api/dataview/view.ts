import { DataviewApi } from 'obsidian-dataview';

export interface View {
    render(
        dv: DataviewApi,
        input: { [key: string]: any } | never
    ): string | void;
}
