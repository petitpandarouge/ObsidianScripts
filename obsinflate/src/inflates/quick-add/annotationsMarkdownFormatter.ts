import { Formatter } from '@obsinflate/infrastructure/formatter';

export class AnnotationsMarkdownFormatter extends Formatter {
    constructor() {
        super(`{{#each annotationSet.annotations}}
>[!quote]
>{{this.target.fragment.text}}

{{this.content.text}}


{{/each}}
`);
    }
}
