import * as fs from 'fs';
import * as path from 'path';
import * as chardet from 'chardet';
import { FileDoesNotExistError } from '@obsinflate/infrastructure/fileDoesNotExistError';

export class File {
    static mustExist = (absolutePath: string): File => {
        if (!fs.existsSync(absolutePath)) {
            throw new FileDoesNotExistError(absolutePath);
        }
        return new File(absolutePath);
    };
    private constructor(
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
    }
    path: string;
    nameWithExtension: string;
    name: string;
    extension: string;
    encoding: BufferEncoding;
    read: () => Promise<string> = async () => {
        return await fs.promises.readFile(this.path, this.encoding);
    };
}

export interface IFileSystem {
    getFiles(directoryPath: string): Promise<File[]>;
}

export class FileSystem implements IFileSystem {
    async getFiles(directoryPath: string): Promise<File[]> {
        const fileNames = await fs.promises.readdir(directoryPath);

        const files: File[] = [];
        for (const fileName of fileNames) {
            const filePath = path.join(directoryPath, fileName);
            const stat = await fs.promises.stat(filePath);
            if (stat.isFile()) {
                files.push(File.mustExist(filePath));
            }
        }

        return files;
    }
}
