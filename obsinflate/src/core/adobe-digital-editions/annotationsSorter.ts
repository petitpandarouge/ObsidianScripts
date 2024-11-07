import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { AnnotationsNotStrictlyBeforeOrAfterError } from '@obsinflate/core/adobe-digital-editions/annotationsNotStrictlyBeforeOrAfterError';
import { Annotation } from '@obsinflate/core/adobe-digital-editions/annotations';
import {
    EpubFiles,
    EpubFile
} from '@obsinflate/core/adobe-digital-editions/epubFile';

export interface IAnnotationsSorter {
    sort(annotations: Annotation[]): EpubFiles;
}

export class AnnotationsSorter implements IAnnotationsSorter {
    sort(annotations: Annotation[]): EpubFiles {
        const groupedAnnotations = this.groupByFilePath(annotations);
        groupedAnnotations.forEach((file) => {
            file.annotations.sort((a, b) => {
                const position = a.target.fragment.start.isPositionned(
                    b.target.fragment.start
                );
                if (
                    (position & EpubPointPosition.Before) ===
                    EpubPointPosition.Before
                ) {
                    return -1;
                } else if (position === EpubPointPosition.After) {
                    return 1;
                } else {
                    throw new AnnotationsNotStrictlyBeforeOrAfterError();
                }
            });
        });

        return { files: groupedAnnotations };
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
