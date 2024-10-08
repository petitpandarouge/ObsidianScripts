﻿import { WorkspaceParentRuntime } from '@obsinflate/api/obsidian/workspaceParentRuntime';

export const isWorkspaceRootRuntime = (
    leaf: WorkspaceParentRuntime
): boolean => {
    return leaf.containerEl.hasClass('mod-root');
};
