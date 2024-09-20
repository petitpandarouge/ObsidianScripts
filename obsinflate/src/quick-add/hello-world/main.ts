import { NoticeWrapper } from "@obsidian/noticeWrapper";
import { Script } from "@obsidian/quick-add/script";

const helloWorld: Script = async () => {
    new NoticeWrapper("Hello World !", 5000)
    return Promise.resolve();
}

module.exports = helloWorld;