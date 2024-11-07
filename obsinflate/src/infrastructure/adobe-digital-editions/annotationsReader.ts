import { IXmlParser } from '@obsinflate/infrastructure/xmlParser';
import { File } from '@obsinflate/infrastructure/fileSystem';
import { ANNOTATIONS_FILE_EXTENSION } from '@obsinflate/core/adobe-digital-editions/fileExtensions';
import { InvalidFileExtensionError } from '@obsinflate/infrastructure/invalidFileExtensionError';
import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { Annotations } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

export const NO_PREFIX = '';

export function attributeValueProcessor(
    attrName: string,
    attrValue: string
): string | EpubPoint {
    if (attrName === 'start' || attrName === 'end') {
        return EpubPoint.FromString(attrValue);
    }
    return attrValue;
}

export function updateTag(tagName: string): string {
    if (tagName === 'annotation') {
        return 'annotations';
    }
    return tagName;
}

export interface IAnnotationsReader {
    read(file: File): Promise<Annotations>;
}

// TODO : must be covered by tests
// TODO must be in core
export class AnnotationsReader implements IAnnotationsReader {
    constructor(private xmlParser: IXmlParser<Annotations>) {}

    async read(file: File): Promise<Annotations> {
        if (file.extension !== ANNOTATIONS_FILE_EXTENSION) {
            throw new InvalidFileExtensionError(
                file.path,
                ANNOTATIONS_FILE_EXTENSION
            );
        }
        const xmlData = await file.read();
        const annotations = this.xmlParser.parse(xmlData, {
            removeNSPrefix: true,
            ignoreAttributes: false,
            attributeNamePrefix: NO_PREFIX,
            attributeValueProcessor: attributeValueProcessor,
            updateTag: updateTag
        });
        return annotations;
    }
}
