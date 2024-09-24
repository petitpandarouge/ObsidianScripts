import { DataviewApi } from 'obsidian-dataview';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ViewBuilder<TInput extends { [key: string]: any } | never> {
    build: (dv: DataviewApi, input: TInput) => string | void;
}
