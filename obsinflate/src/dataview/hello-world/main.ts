import { DataviewApi } from 'obsidian-dataview';
import { ViewBuilder } from '@obsinflate/dataview/viewBuilder';
import { View } from '@obsinflate/dataview/view';

class Input {
    name!: string;
}

class HelloWorld implements View {
    render(dv: DataviewApi, input: Input) {
        const header = input.name ? `Hello ${input.name}` : 'Hello World';
        dv.header(1, header);
        dv.table(['Name', 'Ids'], [['Me', 0]]);
    }
}

export class HelloWorldBuilder implements ViewBuilder {
    build() {
        return new HelloWorld();
    }
}
