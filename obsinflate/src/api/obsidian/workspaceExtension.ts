import { MarkdownViewLeafExtension } from '@obsinflate/api/obsidian/markdownViewLeafExtension';
import { NoActiveNoteFoundError } from '@obsinflate/api/obsidian/noActiveNoteFoundError';
import { PanelPosition } from '@obsinflate/api/obsidian/panelPosition';
import { ViewType } from '@obsinflate/api/obsidian/viewType';
import {
    isMarkdownViewLeafRuntime,
    isWorkspaceLeafRuntime,
    WorkspaceLeafExtension
} from '@obsinflate/api/obsidian/workspaceLeafExtension';
import { Workspace } from 'obsidian';

export interface IWorkspaceExtension {
    native: Workspace;
    getCenterPanelMarkdownActiveLeaf: () => MarkdownViewLeafExtension;
}

export class WorkspaceExtension implements IWorkspaceExtension {
    private constructor(workspace: Workspace) {
        this.native = workspace;
    }
    native: Workspace;

    static extends(workspace: Workspace): IWorkspaceExtension {
        return new WorkspaceExtension(workspace);
    }

    getCenterPanelMarkdownActiveLeaf(): MarkdownViewLeafExtension {
        const leaf = this.native
            .getLeavesOfType(ViewType.Markdown)
            .find((leaf) => {
                if (!isWorkspaceLeafRuntime(leaf)) {
                    return false;
                }
                const extendedLeaf = WorkspaceLeafExtension.extends(leaf);
                return (
                    extendedLeaf.isInCenterPanel() &&
                    extendedLeaf.hasTabActive() &&
                    extendedLeaf.hasMarkdownFile()
                );
            });
        if (!leaf || !isMarkdownViewLeafRuntime(leaf)) {
            throw new NoActiveNoteFoundError(PanelPosition.Center);
        }
        return MarkdownViewLeafExtension.extends(leaf);
    }
}
