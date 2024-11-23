import { MarkdownViewLeafRuntime } from '@obsinflate/api/obsidian/markdownViewLeafRuntime';

export class MarkdownViewLeafExtension {
    private constructor(leaf: MarkdownViewLeafRuntime) {
        this.native = leaf;
    }
    native: MarkdownViewLeafRuntime;

    static extends(leaf: MarkdownViewLeafRuntime): MarkdownViewLeafExtension {
        return new MarkdownViewLeafExtension(leaf);
    }

    getFolderPath(): string {
        const folder = this.native.view.file!.parent!;
        return folder.path;
    }
}
