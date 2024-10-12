import { promises as fs } from 'fs';
import { join } from 'path';

export interface File {
    name: string;
    path: string;
}

export interface IExplorer {
    getFiles(directoryPath: string): Promise<File[]>;
}

export class Explorer implements IExplorer {
    async getFiles(directoryPath: string): Promise<File[]> {
        const fileNames = await fs.readdir(directoryPath);

        const files: File[] = [];
        for (const fileName of fileNames) {
            const filePath = join(directoryPath, fileName);
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
                files.push({ name: fileName, path: filePath });
            }
        }

        return files;
    }
}
