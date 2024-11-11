import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import {
    NotePropertyUpdaterSettings,
    SettingsDefinition
} from '@obsinflate/inflates/quick-add/note-property-updater/settings';
import { NotePropertyUpdater } from '@obsinflate/inflates/quick-add/note-property-updater/script';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder =
            new SettingsBuilder<NotePropertyUpdaterSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const script = new NotePropertyUpdater(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition)
        );
        await script.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
