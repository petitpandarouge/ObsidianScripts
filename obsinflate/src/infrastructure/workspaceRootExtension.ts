import { WorkspaceParentRuntime } from '@obsinflate/infrastructure/workspaceParentRuntime';

export const isWorkspaceRootRuntime = (
    leaf: WorkspaceParentRuntime
): boolean => {
    return leaf.containerEl.hasClass('mod-root');
};
