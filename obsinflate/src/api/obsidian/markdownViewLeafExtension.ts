import { MarkdownViewLeafRuntime } from '@obsinflate/api/obsidian/markdownViewLeafRuntime';

export interface IMarkdownViewLeafExtension {
    native: MarkdownViewLeafRuntime;
    getFolderPath: () => string;
}

export class MarkdownViewLeafExtension implements IMarkdownViewLeafExtension {
    private constructor(leaf: MarkdownViewLeafRuntime) {
        this.native = leaf;
    }
    native: MarkdownViewLeafRuntime;

    static extends(leaf: MarkdownViewLeafRuntime): IMarkdownViewLeafExtension {
        return new MarkdownViewLeafExtension(leaf);
    }

    getFolderPath(): string {
        const activeFileFolder = this.native.view.file!.parent!;
        return activeFileFolder.path;
    }
}
