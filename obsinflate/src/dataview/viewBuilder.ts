import { View } from '@obsinflate/dataview/view';

export interface ViewBuilder {
    build: () => View;
}
