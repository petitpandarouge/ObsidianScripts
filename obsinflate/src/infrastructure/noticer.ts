import { Notice } from 'obsidian';

export interface INoticer {
    notice(message: string | DocumentFragment, duration?: number): void;
}

export class Noticer implements INoticer {
    notice(message: string | DocumentFragment, duration?: number): void {
        new Notice(message, duration);
    }
}
