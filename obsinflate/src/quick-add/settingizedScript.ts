import { Parameters } from "@obsidian/quick-add/parameters";
import { SettingsDefinition, Settings } from "@obsidian/quick-add/settings";

export interface SettingizedScript {
    entry: (params: Parameters, settings: Settings) => Promise<void>;
    settings: SettingsDefinition;
}