import { View } from '@obsinflate/api/dataview/view';

export interface ViewBuilder {
    build: () => View;
}
