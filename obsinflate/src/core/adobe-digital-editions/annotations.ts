import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';

export interface Annotations {
    annotationSet: AnnotationSet;
}

export interface AnnotationSet {
    publication: Publication;
    annotations: Annotation[];
}

export interface Publication {
    title: string;
    creator: string;
}

export interface Annotation {
    target: Target;
    content?: Content;
}

export interface Target {
    fragment: Fragment;
}

export interface Fragment {
    text: string;
    start: EpubPoint;
    end: EpubPoint;
}

export interface Content {
    text: string;
}
