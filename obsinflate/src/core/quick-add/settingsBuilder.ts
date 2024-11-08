import {
    Settings,
    SettingsDefinition
} from '@obsinflate/api/quick-add/settings/settings';
import { EmptyNamePropertyError } from '@obsinflate/core/quick-add/emptyNamePropertyError';

export class SettingsBuilder<TSettings> {
    build(fields: Settings, definition: SettingsDefinition): TSettings {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const settings: any = {};
        for (const key in fields) {
            const value = fields[key];
            const option = definition.options[key];
            if (!option.name) {
                throw new EmptyNamePropertyError(key);
            }
            settings[option.name] = value;
        }
        return settings as TSettings;
    }
}
