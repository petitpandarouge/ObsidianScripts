import { Script } from '@obsinflate/quick-add/script';
import { Notice } from 'obsidian';

const helloWorld: Script = async () => {
    new Notice('Hello World !', 5000);
    return Promise.resolve();
};

module.exports = helloWorld;
