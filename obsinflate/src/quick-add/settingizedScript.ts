import { Parameters } from "@obsidian/quick-add/parameters";
import { Settings } from "@obsidian/quick-add/settings";

export interface SettingizedScript {
    entry: (params: Parameters, settings: {[key: string]: string | boolean}) => Promise<void>;
    settings: Settings;
}