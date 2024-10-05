import { Parameters } from '@obsinflate/api/quick-add/parameters';
import {
    SettingsDefinition,
    Settings
} from '@obsinflate/api/quick-add/settings/settings';

export interface SettingableScript {
    entry: (params: Parameters, settings: Settings) => Promise<void>;
    settings: SettingsDefinition;
}
