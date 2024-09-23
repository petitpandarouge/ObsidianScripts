import { Api } from "@obsinflate/dataview/api";

export interface ViewBuilder<TInput extends { [key: string]: any } | never> {
    build: (dv: Api, input: TInput) => string | void;
}