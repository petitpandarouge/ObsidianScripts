﻿import { WorkspaceParentRuntime } from '@obsinflate/infrastructure/workspaceParentRuntime';
import { WorkspaceParent } from 'obsidian';

export const isWorkspaceParentRuntime = (
    parent: WorkspaceParent
): parent is WorkspaceParentRuntime => {
    return 'containerEl' in parent;
};