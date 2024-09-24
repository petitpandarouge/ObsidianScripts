import { Action } from '@obsinflate/action';
import { Notice } from 'obsidian';

export class ErrorNoticer {
    constructor(private noticeTimeoutInMs: number = 5000) {}
    async wrap(action: Action): Promise<void> {
        try {
            await action();
        } catch (error: unknown) {
            if (error instanceof Error) {
                new Notice(error.message, this.noticeTimeoutInMs);
            }
            throw error;
        }
    }
}
