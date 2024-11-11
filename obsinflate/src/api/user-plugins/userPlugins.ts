import { AppRuntime } from '@obsinflate/api/obsidian/appRuntime';
import { ObsidianModule } from '@obsinflate/api/obsidian/module';
import { Plugin } from 'obsidian';

export interface Modules {
    obsidian: ObsidianModule;
}

/**
 * v1.3.0
 * https://github.com/mnowotnik/obsidian-user-plugins/tree/master
 */
export interface UserPlugins extends Plugin {
    app: AppRuntime;
    passedModules: Modules;
}
