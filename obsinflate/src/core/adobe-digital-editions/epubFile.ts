import { Annotation } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

export interface EpubFiles {
    files: EpubFile[];
}

export interface EpubFile {
    path: string;
    annotations: Annotation[];
}
