import { NoticeWrapper } from "@obsinflate/noticeWrapper";
import { Script } from "@obsinflate/quick-add/script";

const helloWorld: Script = async () => {
    new NoticeWrapper("Hello World !", 5000)
    return Promise.resolve();
}

module.exports = helloWorld;