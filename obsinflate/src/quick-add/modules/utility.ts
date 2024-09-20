export interface Utility {
    getClipboard: () => Promise<string>;
    setClipboard: (text: string) => Promise<void>;
}