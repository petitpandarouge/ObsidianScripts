import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { IExplorer } from '@obsinflate/infrastructure/explorer';

export class KoboHighlightsImporter implements Script {
    explorer: IExplorer;
    constructor(explorer: IExplorer) {
        this.explorer = explorer;
    }
    async entry(params: Parameters): Promise<void> {
        const files = this.explorer.getFiles('');
        const displayItems: string[] = files.map((file) => file.name);
        const actualItems: string[] = files.map((file) => file.path);
        await params.quickAddApi.suggester(displayItems, actualItems);
    }
}
