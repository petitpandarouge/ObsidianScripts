import { Noticer } from '@obsinflate/api/obsidian/noticer';
import { AbstractScript } from '@obsinflate/api/quick-add/abstractScript';
import { ScriptEntryPoint } from '@obsinflate/api/quick-add/scriptEntryPoint';
import { ErrorNoticer } from '@obsinflate/core/errorNoticer';
import { Parameters } from '@obsinflate/api/quick-add/parameters';

class HelloWorld extends AbstractScript {
    constructor(
        errorNoticer: ErrorNoticer,
        private noticer: Noticer
    ) {
        super(errorNoticer);
    }
    protected innerEntry(_params: Parameters) {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}

const entryPoint: ScriptEntryPoint = async (params: Parameters) => {
    const noticer = new Noticer();
    const errorNoticer = new ErrorNoticer(noticer);
    const helloWorld = new HelloWorld(errorNoticer, noticer);
    await helloWorld.entry(params);
};

module.exports = entryPoint;
