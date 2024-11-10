import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import {
    ActiveFileInfosSettings,
    SettingsDefinition
} from '@obsinflate/inflates/quick-add/active-file-infos/settings';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { ActiveFileInfos } from '@obsinflate/inflates/quick-add/active-file-infos/script';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder = new SettingsBuilder<ActiveFileInfosSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const suggester = new ActiveFileInfos(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition)
        );
        await suggester.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
