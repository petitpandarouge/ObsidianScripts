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
                this.#notice(error.message);
            } else {
                this.#notice(
                    `An unknown error occured in ${action.name}. Open the Developer Tools to know more about it.`
                );
            }
            throw error;
        }
    }
    #notice(message: string) {
        this.noticer.notice(message, this.noticeTimeoutInMs);
    }
}
