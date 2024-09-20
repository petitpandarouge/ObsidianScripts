import { Settings } from "@obsidian/quick-add/modules/ai/settings";
import { Model } from "@obsidian/quick-add/modules/ai/model";

export interface Ai {
    prompt: (prompt: string, model: Model, settings?: Partial<Settings>) => Promise<{[key: string]: string}>;
    getModels: () => Model[];
    getMaxTokens: (model: Model) => number;
    countTokens: (text: string, model: Model) => number
}