export interface File {
    name: string;
    path: string;
}

export interface IExplorer {
    getFiles(directoryPath: string): File[];
}
