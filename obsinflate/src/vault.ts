import { File } from "@obsidian/file";

export interface Vault {
    create: (path: string, initialContent: string) => Promise<File>;
}