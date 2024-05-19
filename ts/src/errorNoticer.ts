import { Action } from "@obsidian/action";
import { Notice } from "@obsidian/notice";

export class ErrorNoticer {
    constructor(private noticeTime: number = 5000) { }
    async wrap(action: Action): Promise<void> {
        try {
            await action();
        } catch (error: unknown) {
            if (error instanceof Error) {
                new Notice(error.message, this.noticeTime);
            }
            throw error;
        }
    }
}
