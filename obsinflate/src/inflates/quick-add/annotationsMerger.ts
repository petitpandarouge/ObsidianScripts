import { EpubFiles } from '@obsinflate/inflates/quick-add/annotationsSorter';
import { Annotation } from '@obsinflate/infrastructure/adobe-digital-editions/annotations';

export class AnnotationsMerger {
    merge(epubFiles: EpubFiles): EpubFiles {
        return epubFiles;
        // const mergedFiles = epubFiles.files.map((file) => {
        //     file.annotations = this.mergeAnnotations(file.annotations);
        //     return file;
        // });
        // return { files: mergedFiles };
    }

    // mergeAnnotations(annotations: Annotation[]): Annotation[] {
    //     throw new Error('Method not implemented.');
    // }
}
