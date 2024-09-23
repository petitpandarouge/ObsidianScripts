import { Parameters } from "@obsinflate/quick-add/parameters";
import { SettingsDefinition, Settings } from "@obsinflate/quick-add/settings";

export interface SettingizedScript {
    entry: (params: Parameters, settings: Settings) => Promise<void>;
    settings: SettingsDefinition;
}