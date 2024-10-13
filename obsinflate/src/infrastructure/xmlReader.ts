import { File } from '@obsinflate/infrastructure/fileSystem';
import { InvalidXmlError } from '@obsinflate/infrastructure/invalidXmlError';
import { X2jOptions, XMLParser, XMLValidator } from 'fast-xml-parser';
import { promises as fs } from 'fs';

export interface IXmlReader<TObject> {
    read(
        file: File,
        encoding: BufferEncoding,
        options: X2jOptions
    ): Promise<TObject>;
}

export class XmlReader<TObject> implements IXmlReader<TObject> {
    async read(
        file: File,
        encoding: BufferEncoding,
        options: X2jOptions
    ): Promise<TObject> {
        const xmlData = await fs.readFile(file.path, encoding);
        const result = XMLValidator.validate(xmlData);
        if (result !== true) {
            throw new InvalidXmlError(result);
        }
        const parser = new XMLParser(options);
        const jsonObj = parser.parse(xmlData);
        return jsonObj as TObject;
    }
}
