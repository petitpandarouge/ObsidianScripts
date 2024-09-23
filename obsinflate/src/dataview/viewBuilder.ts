import { Api } from "@obsinflate/dataview/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ViewBuilder<TInput extends { [key: string]: any } | never> {
    build: (dv: Api, input: TInput) => string | void;
}