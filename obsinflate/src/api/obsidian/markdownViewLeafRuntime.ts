import { WorkspaceLeafRuntime } from '@obsinflate/api/obsidian/workspaceLeafRuntime';
import { MarkdownView } from 'obsidian';

export interface MarkdownViewLeafRuntime extends WorkspaceLeafRuntime {
    view: MarkdownView;
}
