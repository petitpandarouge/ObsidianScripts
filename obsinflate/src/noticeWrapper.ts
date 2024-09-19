// The Notice class only exists in Obsidian, so we need to declare it to make it exists in this code. 
declare const Notice: any;

export class NoticeWrapper {
    constructor(private message: string, private timeoutInMs: number) { 
        new Notice(this.message, this.timeoutInMs);
    }
}
