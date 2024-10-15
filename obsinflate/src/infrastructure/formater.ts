import Handlebars from 'handlebars';

export interface IFormater {
    format(data: any): string;
}

export class Formater implements IFormater {
    private compiledTemplate: Handlebars.TemplateDelegate;

    constructor(template: string) {
        this.compiledTemplate = Handlebars.compile(template);
    }

    format(data: any): string {
        return this.compiledTemplate(data);
    }
}
