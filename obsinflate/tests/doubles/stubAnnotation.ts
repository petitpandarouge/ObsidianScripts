import { EpubPoint } from '@obsinflate/core/adobe-digital-editions/epubPoint';
import {
    Annotation,
    Content,
    Target
} from '@obsinflate/core/adobe-digital-editions/annotations';
import {
    EpubPointGenerator,
    OffsetOperation,
    OffsetOptions
} from '@obsinflate/tests/data/epubPointGenerator';
import Chance from 'chance';

const chance = new Chance();

export class StubAnnotation implements Annotation {
    constructor(
        start: EpubPoint,
        end: EpubPoint | OffsetOptions = {
            operation: OffsetOperation.Random,
            range: { min: 2, max: 100 }
        }
    ) {
        this.target = {
            fragment: {
                text: chance.paragraph(),
                start: start,
                end:
                    end instanceof EpubPoint
                        ? end
                        : EpubPoint.FromString(
                              EpubPointGenerator.generateFromWithOffset(
                                  start,
                                  end
                              ).pointAsString
                          )
            }
        };
        if (chance.bool()) {
            this.content = {
                text: chance.paragraph()
            };
        }
    }

    target: Target;
    content?: Content;
}
