import { Plugin } from 'obsidian';
import * as obsidian from 'obsidian';

// TODO : Must be in a separate file
export type ObsidianModule = typeof obsidian;

export interface Modules {
    obsidian: ObsidianModule;
}

/**
 * v1.3.0
 * https://github.com/mnowotnik/obsidian-user-plugins/tree/master
 */
export interface UserPlugins extends Plugin {
    passedModules: Modules;
}
