import { EpubFiles } from '@obsinflate/core/adobe-digital-editions/epubFile';
import { Formatter } from '@obsinflate/infrastructure/formatter';

export class AnnotationsMarkdownFormatter extends Formatter<EpubFiles> {
    constructor() {
        super(`{{#each files}}
## {{this.path}}

{{#each this.annotations}}
>[!quote]
>{{this.target.fragment.text}}

{{this.content.text}}


{{/each}}
{{/each}}
`);
    }
}
