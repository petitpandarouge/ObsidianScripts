import { Action } from '@obsinflate/action';
import { INoticer } from '@obsinflate/infrastructure/noticer';
import { Duration } from 'luxon';

export const DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS = 5000;

export class ErrorNoticer {
    constructor(
        private noticer: INoticer,
        private noticeTimeout: Duration = Duration.fromMillis(
            DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS
        )
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
        this.noticer.notice(message, this.noticeTimeout.milliseconds);
    }
}
