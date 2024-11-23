import { MarkdownViewLeafExtension } from '@obsinflate/api/obsidian/markdownViewLeafExtension';
import { NoActiveNoteFoundError } from '@obsinflate/api/obsidian/noActiveNoteFoundError';
import { PanelPosition } from '@obsinflate/api/obsidian/panelPosition';
import { ViewType } from '@obsinflate/api/obsidian/viewType';
import {
    isMarkdownViewLeafRuntime,
    isWorkspaceLeafRuntime,
    WorkspaceLeafExtension
} from '@obsinflate/api/obsidian/workspaceLeafExtension';
import { NoActiveFileFoundError } from '@obsinflate/api/obsidian/noActiveFileFoundError';
import { TFile, Workspace } from 'obsidian';

export class WorkspaceExtension {
    private constructor(workspace: Workspace) {
        this.native = workspace;
    }
    native: Workspace;

    static extends(workspace: Workspace): WorkspaceExtension {
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

    getActiveFile(): TFile {
        const activeFile = this.native.getActiveFile();
        if (!activeFile) {
            throw new NoActiveFileFoundError();
        }
        return activeFile;
    }
}
