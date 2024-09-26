import { WorkspaceLeaf } from 'obsidian';

export interface WorkspaceLeafRuntime extends WorkspaceLeaf {
    tabHeaderEl: HTMLElement;
}
