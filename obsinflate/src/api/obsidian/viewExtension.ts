import { ViewType } from '@obsinflate/api/obsidian/viewType';
import { MarkdownView, View } from 'obsidian';

export const isMarkdownView = (view: View): view is MarkdownView => {
    return view.getViewType() === ViewType.Markdown;
};
