import { Action } from "@obsidian/action";
import { Notice } from "@obsidian/notice";

export class ErrorNoticer {
    async wrap(action: Action): Promise<void> {
        try {
            await action();
        } catch (error: unknown) {
            if (error instanceof Error) {
                new Notice(error.message, 5000);
            }
        }
    }
}
