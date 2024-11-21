import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';
import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import {
    FileNameSanitizerSettings,
    SettingsDefinition
} from '@obsinflate/inflates/quick-add/file-name-sanitizer/settings';
import { FileNameSanitizer } from '@obsinflate/inflates/quick-add/file-name-sanitizer/script';
import { FileNameSanitizer as FileNameSanitizerService } from '@obsinflate/core/fileNameSanitizer';

export class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder =
            new SettingsBuilder<FileNameSanitizerSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const sanitizer = new FileNameSanitizerService();
        const script = new FileNameSanitizer(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition),
            sanitizer
        );
        await script.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
