import { INoticer, Noticer } from '@obsinflate/api/obsidian/noticer';
import { AbstractSettingableScript } from '@obsinflate/api/quick-add/abstractSettingableScript';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { SettingsDefinitionBuilder } from '@obsinflate/core/quick-add/settingsDefinitionBuilder';
import { nameof } from 'ts-simple-nameof';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { SettingableScriptEntryPoint } from '@obsinflate/api/quick-add/settingableScriptEntryPoint';
import { Settings } from '@obsinflate/api/quick-add/settings/settings';
import { SettingsBuilder } from '@obsinflate/core/quick-add/settingsBuilder';

interface HelloWorldSettings {
    name: string;
}

const SettingsDefinition = new SettingsDefinitionBuilder()
    .forScript('Hello World')
    .implementedBy('me')
    .havingTextFieldOption({
        name: nameof<HelloWorldSettings>((s) => s.name),
        label: 'Name to say hello',
        defaultValue: 'World'
    })
    .build();

class HelloWorld extends AbstractSettingableScript<HelloWorldSettings> {
    constructor(
        errorNoticer: ErrorNoticer,
        settings: HelloWorldSettings,
        private noticer: INoticer
    ) {
        super(errorNoticer, settings);
    }
    protected innerEntry(_params: Parameters): Promise<void> {
        this.noticer.notice(`Hello ${this.settings.name} !`, 5000);
        return Promise.resolve();
    }
}

class EntryPoint implements SettingableScriptEntryPoint {
    async entry(params: Parameters, settings: Settings): Promise<void> {
        const settingsBuilder = new SettingsBuilder<HelloWorldSettings>();
        const noticer = new Noticer();
        const errorNoticer = new ErrorNoticer(noticer);
        const helloWorld = new HelloWorld(
            errorNoticer,
            settingsBuilder.build(settings, SettingsDefinition),
            noticer
        );
        await helloWorld.entry(params);
    }
    settings = SettingsDefinition;
}

module.exports = new EntryPoint();
