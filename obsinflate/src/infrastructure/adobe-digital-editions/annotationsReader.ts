import { XmlReader } from '@obsinflate/infrastructure/xmlReader';
import { File } from '@obsinflate/infrastructure/fileSystem';

export interface IAnnotationsReader {
    read(file: File): Promise<AnnotationSet>;
}

export class AnnotationsReader {
    async read(file: File): Promise<Annotations> {
        const reader = new XmlReader<Annotations>();
        return await reader.read(file, 'utf8', { removeNSPrefix: true });
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
