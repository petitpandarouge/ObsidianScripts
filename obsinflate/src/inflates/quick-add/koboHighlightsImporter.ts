import { Script } from '@obsinflate/api/quick-add/script';
import { Parameters } from '@obsinflate/api/quick-add/parameters';
import { IExplorer } from '@obsinflate/infrastructure/explorer';

export const ANNOTATIONS_FILES_DIR_PATH = 'D:/Digital Editions/Annotations';
export const ANNOTATIONS_FILE_EXTENSION = '.annot';

export class KoboHighlightsImporter implements Script {
    constructor(private explorer: IExplorer) {}
    async entry(params: Parameters): Promise<void> {
        const files = this.explorer.getFiles(ANNOTATIONS_FILES_DIR_PATH);
        const displayItems: string[] = files.map((file) => file.name);
        const actualItems: string[] = files.map((file) => file.path);
        await params.quickAddApi.suggester(displayItems, actualItems);
    }
}
