import { MetaEditApi } from '@obsinflate/api/meta-edit/metaEditApi';
import { Plugin } from 'obsidian';

/**
 * v1.8.2
 * https://github.com/chhoumann/MetaEdit/blob/master/src/IMetaEditApi.ts
 */
export interface MetaEdit extends Plugin {
    api: MetaEditApi;
}
