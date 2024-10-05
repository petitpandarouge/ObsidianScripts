import { WorkspaceParent } from 'obsidian';

export interface WorkspaceParentRuntime extends WorkspaceParent {
    containerEl: HTMLElement;
    parent: WorkspaceParentRuntime;
}
