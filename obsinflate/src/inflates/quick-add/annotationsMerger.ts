import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
import { EpubFiles } from '@obsinflate/inflates/quick-add/annotationsSorter';
import { Annotation } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

// TODO : the sorter must be used into the merger
export class AnnotationsMerger {
    merge(epubFiles: EpubFiles): EpubFiles {
        if (epubFiles.files.length === 0) {
            return epubFiles;
        }
        const firstFile = epubFiles.files[0];
        if (firstFile.annotations.length < 2) {
            return epubFiles;
        }
        const annotations = [];
        annotations.push(firstFile.annotations[0]);
        if (firstFile.annotations.length >= 2) {
            const lastAnnotation = annotations[annotations.length - 1];
            const annotation1Fragment = lastAnnotation.target.fragment;
            const annotation2Fragment =
                firstFile.annotations[1].target.fragment;
            const annotation1Range = new EpubRange(
                annotation1Fragment.start,
                annotation1Fragment.end
            );
            const annotation2Range = new EpubRange(
                annotation2Fragment.start,
                annotation2Fragment.end
            );
            if (
                annotation1Range.isPositionned(annotation2Range) ===
                EpubRangePosition.Overlap
            ) {
                const mergedAnnotation = this.mergeAnnotations(
                    lastAnnotation,
                    firstFile.annotations[1]
                );
                annotations.pop();
                annotations.push(mergedAnnotation);
            }
        }
        if (firstFile.annotations.length >= 3) {
            const lastAnnotation = annotations[annotations.length - 1];
            const annotation1Fragment = lastAnnotation.target.fragment;
            const annotation2Fragment =
                firstFile.annotations[2].target.fragment;
            const annotation1Range = new EpubRange(
                annotation1Fragment.start,
                annotation1Fragment.end
            );
            const annotation2Range = new EpubRange(
                annotation2Fragment.start,
                annotation2Fragment.end
            );
            if (
                annotation1Range.isPositionned(annotation2Range) ===
                EpubRangePosition.Overlap
            ) {
                const mergedAnnotation = this.mergeAnnotations(
                    lastAnnotation,
                    firstFile.annotations[2]
                );
                annotations.pop();
                annotations.push(mergedAnnotation);
            }
        }
        if (firstFile.annotations.length === 4) {
            const lastAnnotation = annotations[annotations.length - 1];
            const annotation1Fragment = lastAnnotation.target.fragment;
            const annotation2Fragment =
                firstFile.annotations[3].target.fragment;
            const annotation1Range = new EpubRange(
                annotation1Fragment.start,
                annotation1Fragment.end
            );
            const annotation2Range = new EpubRange(
                annotation2Fragment.start,
                annotation2Fragment.end
            );
            if (
                annotation1Range.isPositionned(annotation2Range) ===
                EpubRangePosition.Overlap
            ) {
                const mergedAnnotation = this.mergeAnnotations(
                    lastAnnotation,
                    firstFile.annotations[3]
                );
                annotations.pop();
                annotations.push(mergedAnnotation);
            }
        }
        epubFiles.files[0].annotations = annotations;
        return epubFiles;
        // const mergedFiles = epubFiles.files.map((file) => {
        //     file.annotations = this.mergeAnnotations(file.annotations);
        //     return file;
        // });
        // return { files: mergedFiles };
    }

    mergeAnnotations(
        annotation1: Annotation,
        annotation2: Annotation
    ): Annotation {
        return {
            target: {
                fragment: {
                    start: annotation1.target.fragment.start,
                    end: annotation2.target.fragment.end,
                    text: `${annotation1.target.fragment.text} ${annotation2.target.fragment.text}`
                }
            },
            content: {
                text: `${annotation1.content.text} ${annotation2.content.text}`
            }
        };
    }

    // mergeAnnotations(annotations: Annotation[]): Annotation[] {
    //     throw new Error('Method not implemented.');
    // }
}
