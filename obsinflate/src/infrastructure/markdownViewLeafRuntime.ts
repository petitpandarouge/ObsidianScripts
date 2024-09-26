import { WorkspaceLeafRuntime } from '@obsinflate/infrastructure/workspaceLeafRuntime';
import { MarkdownView } from 'obsidian';

export interface MarkdownViewLeafRuntime extends WorkspaceLeafRuntime {
    view: MarkdownView;
}
