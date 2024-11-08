import { Action } from '@obsinflate/core/action';
import { INoticer } from '@obsinflate/api/obsidian/noticer';
import { Duration } from 'luxon';
import {
    BUSINESS_ERROR_COLOR,
    Color,
    TECHNICAL_ERROR_COLOR
} from '@obsinflate/api/obsidian/color';
import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';

export const DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS = 20000;

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
            if (error instanceof AbstractBusinessError) {
                this.notice(error.message, BUSINESS_ERROR_COLOR);
            } else {
                if (error instanceof Error) {
                    this.notice(error.message, TECHNICAL_ERROR_COLOR);
                } else {
                    this.notice(
                        `An unknown error occured in "${action.name}" action. Open the Developer Tools to know more about it.`,
                        TECHNICAL_ERROR_COLOR
                    );
                }
                throw error;
            }
        }
    }
    private notice(message: string, color: Color) {
        this.noticer.notice(message, this.noticeTimeout.milliseconds, color);
    }
}
