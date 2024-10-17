import { Formatter } from '@obsinflate/infrastructure/formatter';

export class AnnotationToMarkdownQuoteFormatter extends Formatter {
    constructor() {
        super('>[!quote]\n>{{target.fragment.text}}');
    }
}
