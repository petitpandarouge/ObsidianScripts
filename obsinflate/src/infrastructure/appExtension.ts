import { App } from 'obsidian';
import {
    IWorkspaceExtension,
    WorkspaceExtension
} from '@obsinflate/infrastructure/workspaceExtension';

export interface IAppExtension {
    native: App;
    workspace: IWorkspaceExtension;
}

export class AppExtension implements IAppExtension {
    private constructor(app: App) {
        this.native = app;
        this.workspace = WorkspaceExtension.extends(app.workspace);
    }
    native: App;
    workspace: IWorkspaceExtension;

    static extends(app: App): IAppExtension {
        return new AppExtension(app);
    }
}
