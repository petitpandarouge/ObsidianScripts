import { MarkdownViewLeafRuntime } from '@obsinflate/api/obsidian/markdownViewLeafRuntime';
import { isMarkdownView } from '@obsinflate/api/obsidian/viewExtension';
import { WorkspaceLeafRuntime } from '@obsinflate/api/obsidian/workspaceLeafRuntime';
import { isWorkspaceParentRuntime } from '@obsinflate/api/obsidian/workspaceParentExtension';
import { WorkspaceParentRuntime } from '@obsinflate/api/obsidian/workspaceParentRuntime';
import { isWorkspaceRootRuntime } from '@obsinflate/api/obsidian/workspaceRootExtension';
import { WorkspaceLeaf } from 'obsidian';

export interface IWorkspaceLeafExtension {
    native: WorkspaceLeafRuntime;
    isInCenterPanel(): boolean;
    hasTabActive(): boolean;
    hasMarkdownFile(): boolean;
}

export class WorkspaceLeafExtension implements IWorkspaceLeafExtension {
    private constructor(leaf: WorkspaceLeafRuntime) {
        this.native = leaf;
    }
    native: WorkspaceLeafRuntime;

    static extends(leaf: WorkspaceLeafRuntime): IWorkspaceLeafExtension {
        return new WorkspaceLeafExtension(leaf);
    }

    isInCenterPanel(): boolean {
        let parent: WorkspaceParentRuntime | null = null;
        if (isWorkspaceParentRuntime(this.native.parent)) {
            parent = this.native.parent;
        }
        while (parent !== null) {
            if (isWorkspaceRootRuntime(parent)) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    }

    hasTabActive(): boolean {
        return this.native.tabHeaderEl.hasClass('is-active');
    }

    hasMarkdownFile(): boolean {
        const view = this.native.view;
        if (!isMarkdownView(view)) {
            return false;
        }
        return view.file !== null;
    }
}

export const isWorkspaceLeafRuntime = (
    leaf: WorkspaceLeaf
): leaf is WorkspaceLeafRuntime => {
    return 'tabHeaderEl' in leaf;
};

export const isMarkdownViewLeafRuntime = (
    leaf: WorkspaceLeaf
): leaf is MarkdownViewLeafRuntime => {
    return isMarkdownView(leaf.view);
};
