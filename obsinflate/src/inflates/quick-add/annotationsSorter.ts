import { EpubPointPosition } from '@obsinflate/core/adobe-digital-editions/epubPointPosition';
import { Annotation } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

export class AnnotationsSorter {
    sort(annotations: Annotation[]) {
        annotations.sort((a, b) => {
            return a.target.fragment.start.isPositionned(
                b.target.fragment.start
            ) === EpubPointPosition.Before
                ? -1
                : 1;
        });
    }
}
