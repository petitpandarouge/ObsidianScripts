import { QuickAddApi } from '@obsinflate/api/quick-add/quickAddApi';
import { Plugin } from 'obsidian';

export interface QuickAdd extends Plugin {
    api: QuickAddApi;
}
