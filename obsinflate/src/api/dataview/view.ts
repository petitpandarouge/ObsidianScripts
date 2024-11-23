import { DataviewApi } from 'obsidian-dataview';

export interface View {
    render(
        dv: DataviewApi,
        // TODO use unknown instead of any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input: { [key: string]: any } | never
    ): string | void;
}
