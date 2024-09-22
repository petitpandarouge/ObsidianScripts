import { Api } from "@obsidian/dataview/api";

export interface ViewBuilder<TInput extends { [key: string]: any }> {
    build: (dv: Api, input: TInput) => string | void;
}