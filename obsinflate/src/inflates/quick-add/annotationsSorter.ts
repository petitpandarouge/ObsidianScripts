import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { Annotation } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

export interface EpubFile {
    path: string;
    annotations: Annotation[];
}

export interface IAnnotationsSorter {
    sort(annotations: Annotation[]): EpubFile[];
}

export class AnnotationsSorter {
    sort(annotations: Annotation[]): EpubFile[] {
        const groupedAnnotations = this.groupByFilePath(annotations);
        groupedAnnotations.forEach((file) => {
            file.annotations.sort((a, b) => {
                return a.target.fragment.start.isPositionned(
                    b.target.fragment.start
                ) === EpubPointPosition.Before
                    ? -1
                    : 1;
            });
        });

        return groupedAnnotations;
    }

    private groupByFilePath(annotations: Annotation[]): EpubFile[] {
        const grouped: { [key: string]: Annotation[] } = {};

        annotations.forEach((annotation) => {
            const filePath = annotation.target.fragment.start.filePath;
            if (!grouped[filePath]) {
                grouped[filePath] = [];
            }
            grouped[filePath].push(annotation);
        });

        return Object.keys(grouped).map((filePath) => ({
            path: filePath,
            annotations: grouped[filePath]
        }));
    }
}
