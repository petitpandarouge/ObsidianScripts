import { Action } from '@obsinflate/action';
import { NoticeWrapper } from '@obsinflate/noticeWrapper';

export class ErrorNoticer {
    constructor(private noticeTime: number = 5000) {}
    async wrap(action: Action): Promise<void> {
        try {
            await action();
        } catch (error: unknown) {
            if (error instanceof Error) {
                new NoticeWrapper(error.message, this.noticeTime);
            }
            throw error;
        }
    }
}
