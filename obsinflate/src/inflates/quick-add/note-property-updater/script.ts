import { MetaEdit } from '@obsinflate/api/meta-edit/metaEdit';
import { AppExtension } from '@obsinflate/api/obsidian/appExtension';
import { PluginId } from '@obsinflate/api/obsidian/pluginId';
import { AbstractSettingableScript } from '@obsinflate/core/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { NotePropertyUpdaterSettings } from '@obsinflate/inflates/quick-add/note-property-updater/settings';
import { Parameters } from '@obsinflate/api/quick-add/parameters';

export class NotePropertyUpdater extends AbstractSettingableScript<NotePropertyUpdaterSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: NotePropertyUpdaterSettings
    ) {
        super(errorNoticer, settings);
    }

    protected async innerEntry(params: Parameters): Promise<void> {
        // Input
        const propertyName = this.secureGetVariable<string>(
            params,
            this.settings.propertyNameVariableName
        );
        const value = this.secureGetVariable<string>(
            params,
            this.settings.propertyValueVariableName
        );
        const notePath = this.secureGetVariable<string>(
            params,
            this.settings.notePathVariableName
        );
        // Process
        const app = AppExtension.extends(params.app);
        const metaEdit = app.getPlugin<MetaEdit>(PluginId.MetaEdit);
        return await metaEdit.api.update(propertyName, value, notePath);
    }
}
