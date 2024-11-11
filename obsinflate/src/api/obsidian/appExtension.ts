import {
    IWorkspaceExtension,
    WorkspaceExtension
} from '@obsinflate/api/obsidian/workspaceExtension';
import { AppRuntime } from '@obsinflate/api/obsidian/appRuntime';
import { Plugin } from 'obsidian';
import { PluginId } from '@obsinflate/api/obsidian/pluginId';
import { PluginNotFoundError } from '@obsinflate/api/obsidian/pluginNotFoundError';

export interface IAppExtension {
    native: AppRuntime;
    workspace: IWorkspaceExtension;
    getPlugin<TPlugin extends Plugin>(id: PluginId): TPlugin;
}

// TODO : maybe the extensions must be in the core part...
export class AppExtension implements IAppExtension {
    private constructor(app: AppRuntime) {
        this.native = app;
        this.workspace = WorkspaceExtension.extends(app.workspace);
    }
    native: AppRuntime;
    workspace: IWorkspaceExtension;

    static extends(app: AppRuntime): IAppExtension {
        return new AppExtension(app);
    }

    getPlugin<TPlugin extends Plugin>(id: PluginId): TPlugin {
        const plugin = this.native.plugins.getPlugin(id);
        if (!plugin) {
            throw new PluginNotFoundError(id);
        }
        return plugin as TPlugin;
    }
}
