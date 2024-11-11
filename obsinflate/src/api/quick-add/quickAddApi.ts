import { Utility } from '@obsinflate/api/quick-add/modules/utility';
import { Date } from '@obsinflate/api/quick-add/modules/date';
import { Ai } from '@obsinflate/api/quick-add/modules/ai';

/**
 * v1.11.1
 * https://quickadd.obsidian.guide/docs/QuickAddAPI
 */
export interface QuickAddApi {
    inputPrompt: (
        header: string,
        placeholder?: string,
        value?: string
    ) => Promise<string>;
    wideInputPrompt: (
        header: string,
        placeholder?: string,
        value?: string
    ) => Promise<string>;
    yesNoPrompt: (header: string, text?: string) => Promise<boolean>;
    infoDialog: (header: string, text: string[] | string) => Promise<void>;
    // Returns undefined if no item is selected.
    suggester: (
        displayItems:
            | string[]
            | ((value: string, index?: number, arr?: string[]) => string[]),
        actualItems: string[]
    ) => Promise<string | undefined>;
    checkboxPrompt: (
        items: string[],
        selectedItems: string[]
    ) => Promise<string[]>;
    executeChoice: (
        choiceName: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables?: { [key: string]: any }
    ) => Promise<void>;
    utility: Utility;
    date: Date;
    ai: Ai;
}
