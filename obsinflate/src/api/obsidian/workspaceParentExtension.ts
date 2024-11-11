import { WorkspaceParentRuntime } from '@obsinflate/api/obsidian/workspaceParentRuntime';
import { WorkspaceParent } from 'obsidian';

// TODO : this is not an extension, find an other name.
export const isWorkspaceParentRuntime = (
    parent: WorkspaceParent
): parent is WorkspaceParentRuntime => {
    return 'containerEl' in parent;
};
