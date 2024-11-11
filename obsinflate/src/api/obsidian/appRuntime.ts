import { App, Plugin } from 'obsidian';

export interface AppRuntime extends App {
    plugins: {
        getPlugin(id: string): Plugin | null;
    };
}
