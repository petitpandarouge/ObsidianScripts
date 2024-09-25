import { Parameters } from '@obsinflate/quick-add/parameters';
import {
    SettingsDefinition,
    Settings
} from '@obsinflate/quick-add/settings/settings';

export interface SettingableScript {
    entry: (params: Parameters, settings: Settings) => Promise<void>;
    settings: SettingsDefinition;
}
