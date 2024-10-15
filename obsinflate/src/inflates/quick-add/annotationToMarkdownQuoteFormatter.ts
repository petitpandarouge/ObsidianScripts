import { Formatter } from '@obsinflate/infrastructure/formatter';

// TODO : to test
export class AnnotationToMarkdownQuoteFormatter extends Formatter {
    constructor() {
        super('>[!quote]\n>{{target.fragment.text}}');
    }
}
