/**
 * Mocks for Obsidian API.
 * Only parts of the API that are used in the tests must be implemented here.
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

export class Notice {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_message: string | DocumentFragment, _duration?: number) {
        // Do nothing.
    }
}
