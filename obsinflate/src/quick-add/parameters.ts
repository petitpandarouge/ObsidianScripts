import { App } from 'obsidian';
import { Api } from "@obsinflate/quick-add/api";

export interface Parameters {
    app: App;
    quickAddApi: Api;
    variables: {[key: string]: string | number};
}