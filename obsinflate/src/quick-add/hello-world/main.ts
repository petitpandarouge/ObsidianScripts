import { INoticer, Noticer } from '@obsinflate/infrastructure/noticer';
import { Script } from '@obsinflate/quick-add/script';
import { ScriptEntryPoint } from '@obsinflate/quick-add/scriptEntryPoint';

class HelloWorld implements Script {
    constructor(private noticer: INoticer) {}
    entry() {
        this.noticer.notice('Hello World !', 5000);
        return Promise.resolve();
    }
}

const entryPoint: ScriptEntryPoint = async () => {
    const noticer = new Noticer();
    const helloWorld = new HelloWorld(noticer);
    await helloWorld.entry();
};

module.exports = entryPoint;
