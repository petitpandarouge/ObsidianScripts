import { ViewType } from '@obsinflate/infrastructure/viewType';
import { MarkdownView, View } from 'obsidian';

export const isMarkdownView = (view: View): view is MarkdownView => {
    return view.getViewType() === ViewType.Markdown;
};
