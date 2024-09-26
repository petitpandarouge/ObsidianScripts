import { AbstractBusinessError } from '@obsinflate/abstractBusinessError';
import { PanelPosition as PanelPosition } from '@obsinflate/infrastructure/panelPosition';

export class NoActiveNoteFoundError extends AbstractBusinessError {
    constructor(panel: PanelPosition) {
        super(
            `No active note found in ${PanelPosition[panel].toLowerCase()} panel`
        );
    }
}
