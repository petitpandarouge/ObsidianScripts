import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import { FilesSuggester } from '@obsinflate/inflates/quick-add/files-suggester/script';
import {
    FilesSuggesterSettings,
    SettingsDefinition
} from '@obsinflate/inflates/quick-add/files-suggester/settings';
import { FileSystem } from '@obsinflate/infrastructure/fileSystem';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder = new SettingsBuilder<FilesSuggesterSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const fileSystem = new FileSystem();
        const suggester = new FilesSuggester(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition),
            fileSystem
        );
        await suggester.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
