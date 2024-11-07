import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import { AnnotationsMarkdownFormatter } from '@obsinflate/core/adobe-digital-editions/annotationsMarkdownFormatter';
import { EpubFile } from '@obsinflate/core/adobe-digital-editions/epubFile';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import { StubAnnotation } from '@obsinflate/tests/doubles/stubAnnotation';
import Chance from 'chance';

describe('AnnotationsMarkdownFormatter', () => {
    it('should format the annotations in markdown', () => {
        // Arrange
        const chance = new Chance();
        const filesCount = chance.integer({ min: 1, max: 10 });
        const files: EpubFile[] = [];
        for (let i = 0; i < filesCount; i++) {
            const refPoint = EpubPoint.FromString(
                EpubPointGenerator.generate().pointAsString
            );
            const file: EpubFile = {
                path: refPoint.filePath,
                annotations: []
            };
            const annotationsCount = chance.integer({ min: 1, max: 10 });
            for (let i = 0; i < annotationsCount; i++) {
                file.annotations.push(
                    new StubAnnotation(
                        EpubPoint.FromString(
                            EpubPointGenerator.generateFromWithOffset(refPoint)
                                .pointAsString
                        )
                    )
                );
            }
            files.push(file);
        }
        const formatter = new AnnotationsMarkdownFormatter();
        // Act
        const markdown = formatter.format({ files });
        // Assert
        expect(markdown).toBe(
            files
                .map(
                    (file) =>
                        `## ${file.path}\n\n${file.annotations
                            .map(
                                (annotation) =>
                                    `>[!quote]\n>${annotation.target.fragment.text}\n\n${annotation.content?.text || ''}`
                            )
                            .join('\n\n\n')}\n\n\n`
                )
                .join('')
        );
    });
});
