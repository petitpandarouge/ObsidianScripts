import Handlebars from 'handlebars';

export class Formatter<Tdata> {
    private compiledTemplate: Handlebars.TemplateDelegate;

    constructor(template: string) {
        this.compiledTemplate = Handlebars.compile(template);
    }

    format(data: Tdata): string {
        return this.compiledTemplate(data);
    }
}
