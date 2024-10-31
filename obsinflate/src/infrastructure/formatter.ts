import Handlebars from 'handlebars';

export interface IFormatter<Tdata> {
    format(data: Tdata): string;
}

export class Formatter<Tdata> implements IFormatter<Tdata> {
    private compiledTemplate: Handlebars.TemplateDelegate;

    constructor(template: string) {
        this.compiledTemplate = Handlebars.compile(template);
    }

    format(data: Tdata): string {
        return this.compiledTemplate(data);
    }
}
