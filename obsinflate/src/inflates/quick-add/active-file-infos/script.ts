import { AppExtension } from '@obsinflate/api/obsidian/appExtension';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { ActiveFileInfosSettings } from '@obsinflate/inflates/quick-add/active-file-infos/settings';

export class ActiveFileInfos extends AbstractSettingableScript<ActiveFileInfosSettings> {
    constructor(errorNoticer: ErrorNoticer, settings: ActiveFileInfosSettings) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Process
        const app = AppExtension.extends(params.app);
        const activeFile = app.workspace.getActiveFile();
        // Output
        params.variables[this.settings.basenameVariableName] =
            activeFile.basename;
        params.variables[this.settings.pathVariableName] = activeFile.path;
    }
}
