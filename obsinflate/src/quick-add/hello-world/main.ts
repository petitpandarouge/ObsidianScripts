import { Script } from '@obsinflate/quick-add/script';
import { Notice } from 'obsidian';

class HelloWorld implements Script {
    entry() {
        new Notice('Hello World !', 5000);
        return Promise.resolve();
    }
}

const helloWorld = new HelloWorld();
module.exports = helloWorld.entry;
