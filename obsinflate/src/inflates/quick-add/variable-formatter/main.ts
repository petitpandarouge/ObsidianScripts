import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import { VariablesFormatter } from '@obsinflate/inflates/quick-add/variable-formatter/script';
import {
    SettingsDefinition,
    VariableFormatterSettings
} from '@obsinflate/inflates/quick-add/variable-formatter/settings';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder =
            new SettingsBuilder<VariableFormatterSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const extractor = new VariablesFormatter(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition)
        );
        await extractor.entry(params);
    }

    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
