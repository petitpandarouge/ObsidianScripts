import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import {
    SettingsDefinition,
    StringVariableSetterSettings
} from '@obsinflate/inflates/quick-add/string-variable-setter/settings';
import { StringVariableSetter } from '@obsinflate/inflates/quick-add/string-variable-setter/script';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder =
            new SettingsBuilder<StringVariableSetterSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const script = new StringVariableSetter(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition)
        );
        await script.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
