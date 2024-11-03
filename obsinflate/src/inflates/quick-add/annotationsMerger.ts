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

        mergedFile.annotations.push(file.annotations[0]);

        for (let i = 1; i < file.annotations.length; i++) {
            const annotation1Range = new EpubRange(
                mergedFile.annotations[mergedFile.annotations.length - 1]
            );
            const annotation2Range = new EpubRange(file.annotations[i]);
            if (
                annotation1Range.isPositionned(annotation2Range) ===
                EpubRangePosition.Overlap
            ) {
                const mergedAnnotation = this.mergeAnnotations(
                    mergedFile.annotations[mergedFile.annotations.length - 1],
                    file.annotations[i]
                );
                mergedFile.annotations.pop();
                mergedFile.annotations.push(mergedAnnotation);
            } else {
                mergedFile.annotations.push(file.annotations[i]);
            }
        }

        return mergedFile;
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
