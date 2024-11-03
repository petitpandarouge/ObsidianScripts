import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
import { EpubRangePosition } from '@obsinflate/core/adobe-digital-editions/epubRangePosition';
import {
    EpubFile,
    EpubFiles
} from '@obsinflate/inflates/quick-add/annotationsSorter';
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
        const result: EpubFiles = {
            files: [this.mergeFileAnnotations(firstFile)]
        };
        return result;
        // const mergedFiles = epubFiles.files.map((file) => {
        //     file.annotations = this.mergeAnnotations(file.annotations);
        //     return file;
        // });
        // return { files: mergedFiles };
    }

    mergeFileAnnotations(file: EpubFile): EpubFile {
        const mergedFile: EpubFile = {
            path: file.path,
            annotations: []
        };
        const firstAnnotation = this.copyAnnotation(file.annotations[0]);
        mergedFile.annotations.push(firstAnnotation);
        for (let i = 1; i < file.annotations.length; i++) {
            const lastAnnotation =
                mergedFile.annotations[mergedFile.annotations.length - 1];
            const currentAnnotation = this.copyAnnotation(file.annotations[i]);

            const annotation1Range = new EpubRange(lastAnnotation);
            const annotation2Range = new EpubRange(currentAnnotation);
            if (
                annotation1Range.isPositionned(annotation2Range) !==
                EpubRangePosition.Overlap
            ) {
                mergedFile.annotations.push(annotation2Range.annotation);
            } else {
                this.mergeAnnotations(
                    annotation1Range.annotation,
                    annotation2Range.annotation
                );
            }
        }

        return mergedFile;
    }

    copyAnnotation(annotation: Annotation): Annotation {
        return {
            target: {
                fragment: {
                    start: annotation.target.fragment.start,
                    end: annotation.target.fragment.end,
                    text: annotation.target.fragment.text
                }
            },
            content: {
                text: annotation.content.text
            }
        };
    }

    tryMergeAnnotations(
        annotation1: Annotation,
        annotation2: Annotation
    ): boolean {
        const annotation1Range = new EpubRange(annotation1);
        const annotation2Range = new EpubRange(annotation2);
        if (
            annotation1Range.isPositionned(annotation2Range) !==
            EpubRangePosition.Overlap
        ) {
            return false;
        }
        this.mergeAnnotations(
            annotation1Range.annotation,
            annotation1Range.annotation
        );
        return true;
    }

    mergeAnnotations(annotation1: Annotation, annotation2: Annotation): void {
        annotation1.target.fragment.end = annotation2.target.fragment.end;
        annotation1.target.fragment.text = `${annotation1.target.fragment.text} ${annotation2.target.fragment.text}`;
        annotation1.content.text = `${annotation1.content.text} ${annotation2.content.text}`;
    }

    // mergeAnnotations(annotations: Annotation[]): Annotation[] {
    //     throw new Error('Method not implemented.');
    // }
}
