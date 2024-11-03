import { EpubRange } from '@obsinflate/core/adobe-digital-editions/epubRange';
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
        const mergeFiles: EpubFiles = {
            files: epubFiles.files.map((file) => {
                if (file.annotations.length < 2) {
                    return file;
                }
                return this.mergeFileAnnotations(file);
            })
        };
        return mergeFiles;
    }

    private mergeFileAnnotations(file: EpubFile): EpubFile {
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
            if (!this.tryMergeAnnotations(lastAnnotation, currentAnnotation)) {
                mergedFile.annotations.push(currentAnnotation);
            }
        }

        return mergedFile;
    }

    private tryMergeAnnotations(
        annotation1: Annotation,
        annotation2: Annotation
    ): boolean {
        const annotation1Range = new EpubRange(annotation1);
        const annotation2Range = new EpubRange(annotation2);
        return annotation1Range.tryMerge(annotation2Range);
    }

    private copyAnnotation(annotation: Annotation): Annotation {
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
}
