export interface File {
    name: string;
    path: string;
}

export interface IExplorer {
    getFiles(directoryPath: string): File[];
}

export class Explorer implements IExplorer {
    getFiles(): File[] {
        return [];
    }
}
