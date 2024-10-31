import Handlebars from 'handlebars';

export interface IFormatter {
    format(data: any): string;
}

// TODO : define a specific class as parameter for the data
export class Formatter implements IFormatter {
    private compiledTemplate: Handlebars.TemplateDelegate;

    constructor(template: string) {
        this.compiledTemplate = Handlebars.compile(template);
    }

    format(data: any): string {
        return this.compiledTemplate(data);
    }
}
