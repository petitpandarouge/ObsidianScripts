import { Formatter } from '@obsinflate/infrastructure/formatter';

export class AnnotationsMarkdownFormatter extends Formatter {
    constructor() {
        super(`{{#each annotationSet.annotation}}
>[!quote]
>{{this.target.fragment.text}}

{{this.content.text}}


{{/each}}
`);
    }
}
