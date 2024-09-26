import { MarkdownViewLeafExtension } from '@obsinflate/infrastructure/markdownViewLeafExtension';
import { NoActiveNoteFoundError } from '@obsinflate/infrastructure/noActiveNoteFoundError';
import { PanelPosition } from '@obsinflate/infrastructure/panelPosition';
import { ViewType } from '@obsinflate/infrastructure/viewType';
import {
    isMarkdownViewLeafRuntime,
    isWorkspaceLeafRuntime,
    WorkspaceLeafExtension
} from '@obsinflate/infrastructure/workspaceLeafExtension';
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
