import { DataviewApi } from 'obsidian-dataview';
import { ViewBuilder } from '@obsinflate/api/dataview/viewBuilder';
import { View } from '@obsinflate/api/dataview/view';
import { INoticer, Noticer } from '@obsinflate/api/obsidian/noticer';

interface Input {
    name: string;
}

class HelloWorld implements View {
    constructor(private noticer: INoticer) {}
    render(dv: DataviewApi, input: Input) {
        const header = input.name ? `Hello ${input.name}` : 'Hello World';
        dv.header(1, header);
        dv.table(['Name', 'Ids'], [['Me', 0]]);
        this.noticer.notice('View built !', 5000);
    }
}

export class HelloWorldBuilder implements ViewBuilder {
    build() {
        const noticer = new Noticer();
        return new HelloWorld(noticer);
    }
}
