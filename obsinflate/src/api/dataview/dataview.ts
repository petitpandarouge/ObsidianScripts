import { Plugin } from 'obsidian';
import { DataviewApi } from 'obsidian-dataview';

export interface Dataview extends Plugin {
    api: DataviewApi;
}
