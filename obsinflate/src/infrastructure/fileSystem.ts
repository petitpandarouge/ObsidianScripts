import { promises as fs } from 'fs';
import * as path from 'path';
import * as chardet from 'chardet';

export class File {
    constructor(
        absolutePath: string,
        defaultEncoding: BufferEncoding = 'utf8'
    ) {
        this.path = absolutePath;
        const parsedPath = path.parse(absolutePath);
        this.nameWithExtension = parsedPath.base;
        this.name = parsedPath.name;
        this.extension = parsedPath.ext;
        const encoding = chardet.detectFileSync(absolutePath);
        if (encoding !== null) {
            this.encoding = encoding.toLowerCase() as BufferEncoding;
        } else {
            this.encoding = defaultEncoding;
        }
        path.parse;
    }
    // TODO : implement true FilePath object and FileName object
    path: string;
    nameWithExtension: string;
    name: string;
    extension: string;
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
