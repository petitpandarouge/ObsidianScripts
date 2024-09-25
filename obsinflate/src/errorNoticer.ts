import { Action } from '@obsinflate/action';
import { INoticer } from '@obsinflate/infrastructure/noticer';

export class ErrorNoticer {
    constructor(
        private noticer: INoticer,
        private noticeTimeoutInMs: number = 5000
    ) {}
    async wrap(action: Action): Promise<void> {
        try {
            await action();
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.noticer.notice(error.message, this.noticeTimeoutInMs);
            }
            throw error;
        }
    }
}
