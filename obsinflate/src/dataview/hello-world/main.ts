import { DataviewApi } from 'obsidian-dataview';
import { ViewBuilder } from '@obsinflate/dataview/viewBuilder';

class Input {
    name!: string;
}

export class HelloWorld implements ViewBuilder<Input> {
    build(dv: DataviewApi, input: Input) {
        const header = input.name ? `Hello ${input.name}` : 'Hello World';
        dv.header(1, header);
        dv.table(['Name', 'Ids'], [['Me', 0]]);
    }
}
