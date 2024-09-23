/* eslint-disable @typescript-eslint/no-explicit-any */
import { Utility } from "@obsinflate/quick-add/modules/utility";
import { Date } from "@obsinflate/quick-add/modules/date";
import { Ai } from "@obsinflate/quick-add/modules/ai";

/**
 * v1.11.1
 * https://quickadd.obsidian.guide/docs/QuickAddAPI
 */
export interface Api {
    inputPrompt: (header: string, placeholder?: string, value?: string) => Promise<string>;
    wideInputPrompt: (header: string, placeholder?: string, value?: string) => Promise<string>;
    yesNoPrompt: (header: string, text?: string) => Promise<boolean>;
    infoDialog: (header: string, text: string[] | string) => Promise<void>;
    suggester: (displayItems: string[] | ((value: string, index?: number, arr?: string[]) => string[]), actualItems: string[]) => Promise<string>;
    checkboxPrompt: (items: string[], selectedItems: string[]) => Promise<string[]>;
    executeChoice: (choiceName: string, variables?: {[key: string]: any}) => Promise<void>;
    utility: Utility;
    date: Date;
    ai: Ai;
}