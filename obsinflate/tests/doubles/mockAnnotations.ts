import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import {
    Annotation,
    Content,
    Target
} from '@obsinflate/infrastructure/adobe-digital-editions/annotations';
import { EpubPointGenerator } from '@obsinflate/tests/data/epubPointGenerator';
import Chance from 'chance';

const chance = new Chance();

export class MockAnnotation implements Annotation {
    constructor(start: EpubPoint, end?: EpubPoint) {
        this.target = {
            fragment: {
                text: chance.paragraph(),
                start: start,
                end:
                    end ??
                    EpubPoint.FromString(
                        EpubPointGenerator.generateFromWithOffset(start)
                            .pointAsString
                    )
            }
        };
        this.content = {
            text: chance.paragraph()
        };
    }

    target: Target;
    content: Content;
}
