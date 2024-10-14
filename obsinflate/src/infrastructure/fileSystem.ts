import { promises as fs } from 'fs';
import * as path from 'path';
import * as chardet from 'chardet';

export class File {
    constructor(
        absolutePath: string,
        defaultEncoding: BufferEncoding = 'utf8'
    ) {
        this.path = absolutePath;
        this.name = path.basename(absolutePath);
        const encoding = chardet.detectFileSync(absolutePath);
        if (encoding !== null) {
            this.encoding = encoding.toLowerCase() as BufferEncoding;
        } else {
            this.encoding = defaultEncoding;
        }
    }
    // TODO : implement true FilePath object and FileName object
    path: string;
    name: string;
    encoding: BufferEncoding;
    read: () => Promise<string> = async () => {
        return await fs.readFile(this.path, this.encoding);
    };
}

export interface IFileSystem {
    getFiles(directoryPath: string): Promise<File[]>;
}

export class FileSystem implements IFileSystem {
    async getFiles(directoryPath: string): Promise<File[]> {
        const fileNames = await fs.readdir(directoryPath);

        const files: File[] = [];
        for (const fileName of fileNames) {
            const filePath = path.join(directoryPath, fileName);
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
                files.push(new File(filePath));
            }
        }

        return files;
    }
}
