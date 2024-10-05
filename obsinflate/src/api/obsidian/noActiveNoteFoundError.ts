import { AbstractBusinessError } from '@obsinflate/core/abstractBusinessError';
import { PanelPosition as PanelPosition } from '@obsinflate/api/obsidian/panelPosition';

export class NoActiveNoteFoundError extends AbstractBusinessError {
    constructor(panel: PanelPosition) {
        super(
            `No active note found in ${PanelPosition[panel].toLowerCase()} panel`
        );
    }
}
