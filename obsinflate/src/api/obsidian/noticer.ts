import { Color } from '@obsinflate/api/obsidian/color';
import { Notice } from 'obsidian';

export const OBSINFLATE_NOTICE_PREFIX = 'Obsinflate 📢 ';

export class Noticer {
    notice(
        message: string | DocumentFragment,
        duration?: number,
        color?: Color
    ): void {
        const obsinflateMessage = `${OBSINFLATE_NOTICE_PREFIX}\n${message}`;
        const notice = new Notice(obsinflateMessage, duration);
        this.applyStyle(notice.noticeEl.style, color);
    }
    private applyStyle(style: CSSStyleDeclaration, color?: Color) {
        if (color) {
            style.color = color;
        }
    }
}
