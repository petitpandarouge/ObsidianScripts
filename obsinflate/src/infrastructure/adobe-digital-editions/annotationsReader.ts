import { XmlParser } from '@obsinflate/infrastructure/xmlParser';
import { File } from '@obsinflate/infrastructure/fileSystem';

export interface IAnnotationsReader {
    read(file: File): Promise<AnnotationSet>;
}

export class AnnotationsReader {
    async read(file: File): Promise<Annotations> {
        const xmlData = await file.read();
        const reader = new XmlParser<Annotations>();
        return reader.parse(xmlData, {
            removeNSPrefix: true
        });
    }
}
export interface Annotations {
    annotationSet: AnnotationSet;
}

export interface AnnotationSet {
    publication: Publication;
    annotation: Annotation[];
}

export interface Publication {
    title: string;
    creator: string;
}

export interface Annotation {
    target: Target;
    content: Content;
}

export interface Target {
    fragment: Fragment;
}

export interface Fragment {
    text: string;
}

export interface Content {
    text: string;
}
