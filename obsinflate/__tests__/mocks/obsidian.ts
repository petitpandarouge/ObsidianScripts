/**
 * Mocks for Obsidian API.
 */

export interface App {
    vault: Vault;
}

export interface Vault {
    create: (path: string, data: string) => Promise<TFile>;
}

export interface TFile {
    path: string;
}