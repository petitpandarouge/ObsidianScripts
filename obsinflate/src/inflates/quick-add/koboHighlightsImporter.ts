import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { IExplorer } from '@obsinflate/infrastructure/explorer';

export class KoboHighlightsImporter implements Script {
    constructor(private explorer: IExplorer) {}
    entry(params: Parameters): Promise<void> {
        const displayItems: string[] = [];
        const actualItems: string[] = [];
        params.quickAddApi.suggester(displayItems, actualItems);
        return Promise.resolve();
    }
}
